import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

const allowedEnglishStatuses = new Set(["official", "summary-only", "unavailable"]);
const allowedScholarshipTypes = new Set(["foundational", "specialized"]);
const allowedSourceLanguages = new Set(["zh", "en", "bilingual"]);
const allowedPublicationTypes = new Set(["journal", "book", "government", "think-tank", "research-institute", "academic-platform"]);
const requiredResourceFields = [
  "slug",
  "title",
  "summary",
  "category",
  "kind",
  "topics",
  "authority",
  "date",
  "jurisdiction",
  "keywords",
  "officialChineseUrl",
  "officialEnglishUrl",
  "englishStatus"
];

const readResources = async () => {
  const [resources, supplementalScholarship] = await Promise.all([
    readJson("../src/data/resources.json"),
    readJson("../src/data/supplemental-scholarship.json")
  ]);
  return [...new Map([...resources, ...supplementalScholarship].map((resource) => [resource.slug, resource])).values()];
};

test("resources satisfy the bilingual metadata contract", async () => {
  const taxonomy = await readJson("../src/data/taxonomy.json");
  const resources = await readResources();
  const categories = new Set(taxonomy.categories.map((item) => item.id));
  const kinds = new Set(taxonomy.kinds.map((item) => item.id));
  const topics = new Set(taxonomy.topics.map((item) => item.id));
  const slugs = new Set();

  assert.ok(resources.length >= 145, "seed library should include at least one hundred forty-five records");

  for (const resource of resources) {
    for (const field of requiredResourceFields) {
      assert.ok(Object.hasOwn(resource, field), `${resource.slug ?? "unknown"} is missing ${field}`);
    }

    assert.match(resource.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(slugs.has(resource.slug), false, `duplicate slug: ${resource.slug}`);
    slugs.add(resource.slug);

    assert.ok(resource.title.zh.trim(), `${resource.slug} needs a Chinese title`);
    assert.ok(resource.title.en.trim(), `${resource.slug} needs an English title or title-style summary`);
    assert.ok(resource.summary.zh.trim(), `${resource.slug} needs a Chinese summary`);
    assert.ok(resource.summary.en.trim(), `${resource.slug} needs an English summary`);
    assert.ok(categories.has(resource.category), `${resource.slug} has unknown category ${resource.category}`);
    assert.ok(kinds.has(resource.kind), `${resource.slug} has unknown kind ${resource.kind}`);
    assert.ok(resource.topics.length > 0, `${resource.slug} should have at least one topic`);

    for (const topic of resource.topics) {
      assert.ok(topics.has(topic), `${resource.slug} has unknown topic ${topic}`);
    }

    assert.match(resource.officialChineseUrl, /^https?:\/\//);
    assert.ok(allowedEnglishStatuses.has(resource.englishStatus), `${resource.slug} has invalid English status`);

    if (resource.englishStatus === "official") {
      assert.match(resource.officialEnglishUrl, /^https?:\/\//, `${resource.slug} marked official needs officialEnglishUrl`);
    }

    assert.ok(resource.keywords.zh.length > 0, `${resource.slug} needs Chinese keywords`);
    assert.ok(resource.keywords.en.length > 0, `${resource.slug} needs English keywords`);
  }
});

test("scholarship records are a standalone curated section", async () => {
  const resources = await readResources();
  const scholarship = resources.filter((resource) => resource.category === "scholarship");
  const foundational = scholarship.filter((resource) => resource.scholarshipType === "foundational");
  const specialized = scholarship.filter((resource) => resource.scholarshipType === "specialized");
  const englishSources = scholarship.filter((resource) => ["en", "bilingual"].includes(resource.sourceLanguage));
  const chineseSources = scholarship.filter((resource) => ["zh", "bilingual"].includes(resource.sourceLanguage));

  assert.ok(scholarship.length >= 40, `scholarship section should include at least 40 records, got ${scholarship.length}`);
  assert.ok(foundational.length >= 12, `foundational scholarship should include at least 12 records, got ${foundational.length}`);
  assert.ok(specialized.length >= 24, `specialized scholarship should include at least 24 records, got ${specialized.length}`);
  assert.ok(englishSources.length >= 18, `English-language scholarship should include at least 18 records, got ${englishSources.length}`);
  assert.ok(chineseSources.length >= 18, `Chinese-language scholarship should include at least 18 records, got ${chineseSources.length}`);

  for (const resource of scholarship) {
    assert.ok(
      allowedScholarshipTypes.has(resource.scholarshipType),
      `${resource.slug} should declare foundational or specialized scholarshipType`
    );
    assert.ok(
      allowedSourceLanguages.has(resource.sourceLanguage),
      `${resource.slug} should declare sourceLanguage`
    );
    assert.ok(
      allowedPublicationTypes.has(resource.publicationType),
      `${resource.slug} should declare a formal publicationType`
    );
    assert.ok(resource.authors && resource.authors.zh && resource.authors.en, `${resource.slug} should provide author metadata`);
    assert.ok(resource.authors.zh.trim() && resource.authors.en.trim(), `${resource.slug} should provide author names in both languages`);
  }
});

test("taxonomy keeps Chinese and English navigation in parity", async () => {
  const taxonomy = await readJson("../src/data/taxonomy.json");

  for (const group of ["categories", "kinds", "topics", "tools"]) {
    assert.ok(Array.isArray(taxonomy[group]), `${group} should be an array`);
    assert.ok(taxonomy[group].length > 0, `${group} should not be empty`);

    for (const item of taxonomy[group]) {
      assert.ok(item.id, `${group} item needs id`);
      assert.ok(item.label.zh.trim(), `${item.id} needs Chinese label`);
      assert.ok(item.label.en.trim(), `${item.id} needs English label`);
      assert.ok(item.description.zh.trim(), `${item.id} needs Chinese description`);
      assert.ok(item.description.en.trim(), `${item.id} needs English description`);
    }
  }
});

test("seed library covers every major research topic and category", async () => {
  const taxonomy = await readJson("../src/data/taxonomy.json");
  const resources = await readResources();
  const categoryMinimums = new Map([
    ["policy", 15],
    ["legislation", 40],
    ["treaties", 22],
    ["cases", 18],
    ["scholarship", 40],
    ["global-governance", 12]
  ]);

  for (const category of taxonomy.categories) {
    const count = resources.filter((resource) => resource.category === category.id).length;
    assert.ok(
      count >= (categoryMinimums.get(category.id) ?? 1),
      `category ${category.id} should have at least ${categoryMinimums.get(category.id) ?? 1} records, got ${count}`
    );
  }

  for (const topic of taxonomy.topics) {
    const count = resources.filter((resource) => resource.topics.includes(topic.id)).length;
    assert.ok(count >= 2, `topic ${topic.id} should have at least two records, got ${count}`);
  }
});

test("seed library includes core private international law and treaty mechanisms", async () => {
  const resources = await readResources();
  const slugs = new Set(resources.map((resource) => resource.slug));
  const requiredSlugs = [
    "law-applicable-foreign-related-civil-relations",
    "civil-procedure-law-2023-foreign-related",
    "personal-information-protection-law",
    "data-security-law",
    "apostille-convention-china",
    "new-york-convention-china",
    "singapore-convention-mediation",
    "icsid-convention-china",
    "wto-china-profile",
    "rcep-agreement",
    "unclos-china",
    "paris-agreement-china",
    "hague-choice-of-court-convention-china",
    "hague-judgments-convention-china",
    "belt-and-road-white-paper-2023",
    "global-security-initiative-concept-paper",
    "international-criminal-judicial-assistance-law",
    "company-law-2023",
    "unctad-investment-policy-hub-china",
    "ip-dispute-regulation-2025"
  ];

  for (const slug of requiredSlugs) {
    assert.ok(slugs.has(slug), `seed library should include ${slug}`);
  }

  assert.ok(resources.some((resource) => resource.kind === "treaty"), "seed library should classify treaty records");
});

test("research tools include an official source map", async () => {
  const taxonomy = await readJson("../src/data/taxonomy.json");
  assert.ok(
    taxonomy.tools.some((tool) => tool.id === "source-map"),
    "research tools should include source-map for official bilingual source navigation"
  );
});
