import resources from "../data/resources.json";
import taxonomy from "../data/taxonomy.json";

export const languages = ["zh", "en"] as const;
export type Language = (typeof languages)[number];

export type LocalizedText = {
  zh: string;
  en: string;
};

export type EnglishStatus = "official" | "summary-only" | "unavailable";
export type ScholarshipType = "foundational" | "specialized";
export type SourceLanguage = "zh" | "en" | "bilingual";
export type PublicationType = "journal" | "government" | "think-tank" | "research-institute" | "academic-platform";

export type TaxonomyItem = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
};

export type Resource = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: string;
  kind: string;
  topics: string[];
  authority: LocalizedText;
  authors?: LocalizedText;
  date: string;
  jurisdiction: string;
  keywords: {
    zh: string[];
    en: string[];
  };
  officialChineseUrl: string;
  officialEnglishUrl: string;
  englishStatus: EnglishStatus;
  scholarshipType?: ScholarshipType;
  sourceLanguage?: SourceLanguage;
  publicationType?: PublicationType;
};

export const siteCopy = {
  zh: {
    siteName: "中国涉外法治研究门户",
    shortName: "涉外法治门户",
    eyebrow: "资料库 / 专题研究 / 双语索引",
    headline: "中国涉外法治研究门户",
    intro:
      "聚合政策文件、涉外立法、国际法与条约、案例实践和学术文献，优先标注官方英文资料；暂无官方英文版时提供英文简介。",
    searchPlaceholder: "检索涉外法治、制裁、条约、仲裁、企业合规...",
    navHome: "首页",
    navResources: "资料库",
    navScholarship: "学术文献",
    navTopics: "专题研究",
    navTools: "研究工具",
    allCategories: "全部栏目",
    allKinds: "全部类型",
    allTopics: "全部专题",
    allYears: "全部年份",
    allEnglish: "英文状态",
    officialEnglish: "有官方英文版",
    summaryOnly: "英文简介",
    unavailable: "暂无英文资料",
    latest: "最新资料",
    categories: "资料库",
    scholarship: "学术文献",
    scholarshipIntro:
      "汇集正式刊物、政府机构、研究机构和智库发表的涉外法治研究，只展示题录、摘要和合法来源链接。",
    foundationalScholarship: "基础理论",
    specializedScholarship: "专门问题",
    sourceLink: "来源链接",
    sourceLanguage: "来源语言",
    scholarshipType: "文献类型",
    publicationType: "发表类型",
    allScholarshipTypes: "全部文献类型",
    allSourceLanguages: "全部来源语种",
    allPublicationTypes: "全部发表类型",
    publicationTypeJournal: "正式刊物",
    publicationTypeGovernment: "政府机构",
    publicationTypeResearchInstitute: "研究机构",
    publicationTypeThinkTank: "智库机构",
    publicationTypeAcademicPlatform: "学术平台",
    sourceLanguageZh: "中文",
    sourceLanguageEn: "英文",
    sourceLanguageBilingual: "双语",
    authority: "来源机构",
    allAuthorities: "全部来源机构",
    topicCoverage: "专题速览",
    resourceTypeBreakdown: "资料类型分布",
    authorityTop: "来源机构（前几）",
    topAuthorities: "来源机构",
    latestInTopic: "专题最新",
    recordsByYearRange: "时间跨度",
    yearRangeLabel: "年度范围",
    noTopicRecords: "当前专题暂无资料",
    kinds: "资料类型",
    topics: "专题研究",
    tools: "研究工具",
    featured: "重点资料",
    officialCn: "官方中文",
    officialEn: "官方英文",
    englishSummaryOnly: "英文简介",
    noOfficialEnglish: "暂无官方英文",
    source: "来源",
    author: "作者",
    date: "日期",
    jurisdiction: "法域",
    keywords: "关键词",
    related: "相关资料",
    relatedTopics: "相关专题",
    openItems: "待补充清单",
    records: "条资料",
    clear: "清除筛选",
    noResults: "没有匹配资料",
    languageSwitch: "English"
  },
  en: {
    siteName: "China Foreign-Related Rule of Law Portal",
    shortName: "FRRL Portal",
    eyebrow: "Library / Research Topics / Bilingual Index",
    headline: "China Foreign-Related Rule of Law Research Portal",
    intro:
      "A bilingual research gateway for policy documents, legislation, treaties, cases, and scholarship. Official English sources are prioritized; where none exists, the portal provides an English summary only.",
    searchPlaceholder: "Search rule of law, sanctions, treaties, arbitration, compliance...",
    navHome: "Home",
    navResources: "Library",
    navScholarship: "Scholarship",
    navTopics: "Topics",
    navTools: "Tools",
    allCategories: "All categories",
    allKinds: "All types",
    allTopics: "All topics",
    allYears: "All years",
    allEnglish: "English status",
    officialEnglish: "Official English",
    summaryOnly: "Summary only",
    unavailable: "Unavailable",
    latest: "Latest",
    categories: "Library",
    scholarship: "Scholarship",
    scholarshipIntro:
      "A curated bibliography of formal journal articles, government and research-institute essays, and think-tank analysis on foreign-related rule of law, with summaries and lawful source links only.",
    foundationalScholarship: "Foundational Theory",
    specializedScholarship: "Specialized Issues",
    sourceLink: "Source",
    sourceLanguage: "Source language",
    scholarshipType: "Scholarship type",
    publicationType: "Publication type",
    allScholarshipTypes: "All scholarship types",
    allSourceLanguages: "All source languages",
    allPublicationTypes: "All publication types",
    publicationTypeJournal: "Journal",
    publicationTypeGovernment: "Government institution",
    publicationTypeResearchInstitute: "Research institute",
    publicationTypeThinkTank: "Think tank",
    publicationTypeAcademicPlatform: "Academic platform",
    sourceLanguageZh: "Chinese",
    sourceLanguageEn: "English",
    sourceLanguageBilingual: "Bilingual",
    authority: "Authority",
    allAuthorities: "All authorities",
    topicCoverage: "Topic snapshot",
    resourceTypeBreakdown: "Resource types",
    authorityTop: "Top authorities",
    topAuthorities: "Authorities",
    latestInTopic: "Latest in topic",
    recordsByYearRange: "Year range",
    yearRangeLabel: "Year coverage",
    noTopicRecords: "No records in this topic yet",
    kinds: "Record types",
    topics: "Research topics",
    tools: "Research tools",
    featured: "Featured records",
    officialCn: "Official Chinese",
    officialEn: "Official English",
    englishSummaryOnly: "English summary",
    noOfficialEnglish: "No official English",
    source: "Authority",
    author: "Author",
    date: "Date",
    jurisdiction: "Jurisdiction",
    keywords: "Keywords",
    related: "Related records",
    relatedTopics: "Related topics",
    openItems: "To be added",
    records: "records",
    clear: "Clear filters",
    noResults: "No matching records",
    languageSwitch: "中文"
  }
} as const;

export const typedResources = resources as Resource[];
export const categories = taxonomy.categories as TaxonomyItem[];
export const kinds = taxonomy.kinds as TaxonomyItem[];
export const topics = taxonomy.topics as TaxonomyItem[];
export const tools = taxonomy.tools as TaxonomyItem[];

export function isLanguage(value: string | undefined): value is Language {
  return value === "zh" || value === "en";
}

export function getCopy(lang: Language) {
  return siteCopy[lang];
}

export function getLocalized(text: LocalizedText, lang: Language): string {
  return text[lang] || text.zh || text.en;
}

export function getCategory(id: string): TaxonomyItem {
  return categories.find((item) => item.id === id) ?? categories[0];
}

export function getKind(id: string): TaxonomyItem {
  return kinds.find((item) => item.id === id) ?? kinds[0];
}

export function getTopic(id: string): TaxonomyItem {
  return topics.find((item) => item.id === id) ?? topics[0];
}

export function getTool(id: string): TaxonomyItem {
  return tools.find((item) => item.id === id) ?? tools[0];
}

export function formatDate(date: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getYears(): string[] {
  return [...new Set(typedResources.map((resource) => resource.date.slice(0, 4)))].sort((a, b) =>
    b.localeCompare(a)
  );
}

export function latestResources(limit = 6): Resource[] {
  return [...typedResources].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function resourceSearchText(resource: Resource): string {
  return [
    resource.title.zh,
    resource.title.en,
    resource.summary.zh,
    resource.summary.en,
    resource.authority.zh,
    resource.authority.en,
    resource.authors?.zh ?? "",
    resource.authors?.en ?? "",
    resource.jurisdiction,
    ...resource.keywords.zh,
    ...resource.keywords.en
  ]
    .join(" ")
    .toLowerCase();
}

export function languagePath(lang: Language, path = ""): string {
  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "/");
}
