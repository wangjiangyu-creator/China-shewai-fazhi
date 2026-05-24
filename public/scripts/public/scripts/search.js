(function () {
  const panels = document.querySelectorAll("[data-search-panel]");

  panels.forEach((panel) => {
    const input = panel.querySelector("[data-search-input]");
    const cards = [...panel.querySelectorAll("[data-resource-card]")];
    const count = panel.querySelector("[data-result-count]");
    const empty = panel.querySelector("[data-empty-state]");
    const filters = {
      category: panel.querySelector('[data-filter="category"]'),
      kind: panel.querySelector('[data-filter="kind"]'),
      topic: panel.querySelector('[data-filter="topic"]'),
      year: panel.querySelector('[data-filter="year"]'),
      english: panel.querySelector('[data-filter="english"]'),
      scholarshipType: panel.querySelector('[data-filter="scholarship-type"]'),
      sourceLanguage: panel.querySelector('[data-filter="source-language"]'),
      publicationType: panel.querySelector('[data-filter="publication-type"]'),
      authority: panel.querySelector('[data-filter="authority"]')
    };

    const normalize = (value) => (value || "").trim().toLowerCase();

    const update = () => {
      const query = normalize(input && input.value);
      const selected = {
        category: filters.category && filters.category.value,
        kind: filters.kind && filters.kind.value,
        topic: filters.topic && filters.topic.value,
        year: filters.year && filters.year.value,
        english: filters.english && filters.english.value,
        scholarshipType: filters.scholarshipType && filters.scholarshipType.value,
        sourceLanguage: filters.sourceLanguage && filters.sourceLanguage.value,
        publicationType: filters.publicationType && filters.publicationType.value,
        authority: filters.authority && filters.authority.value,
        q: input && input.value ? input.value.trim() : ""
      };

      let visible = 0;

      cards.forEach((card) => {
        const searchText = normalize(card.dataset.search);
        const matchQuery = !query || searchText.includes(query);
        const matchCategory = !selected.category || card.dataset.category === selected.category;
        const matchKind = !selected.kind || card.dataset.kind === selected.kind;
        const matchTopic = !selected.topic || (card.dataset.topics || "").split(" ").includes(selected.topic);
        const matchYear = !selected.year || card.dataset.year === selected.year;
        const matchEnglish = !selected.english || card.dataset.englishStatus === selected.english;
        const matchScholarshipType =
          !selected.scholarshipType || card.dataset.scholarshipType === selected.scholarshipType;
        const matchSourceLanguage =
          !selected.sourceLanguage || card.dataset.sourceLanguage === selected.sourceLanguage;
        const matchPublicationType =
          !selected.publicationType || card.dataset.publicationType === selected.publicationType;
        const matchAuthority = !selected.authority || card.dataset.authority === selected.authority;

        const shouldShow =
          matchQuery &&
          matchCategory &&
          matchKind &&
          matchTopic &&
          matchYear &&
          matchEnglish &&
          matchScholarshipType &&
          matchSourceLanguage &&
          matchPublicationType &&
          matchAuthority;

        card.hidden = !shouldShow;
        if (shouldShow) visible += 1;
      });

      if (count) count.textContent = String(visible);
      if (empty) empty.hidden = visible !== 0;
      syncUrlParams(selected);
    };

    const syncUrlParams = (selected) => {
      const params = new URLSearchParams(window.location.search);
      const mappings = [
        ["category", selected.category],
        ["kind", selected.kind],
        ["topic", selected.topic],
        ["year", selected.year],
        ["english", selected.english],
        ["scholarship-type", selected.scholarshipType],
        ["source-language", selected.sourceLanguage],
        ["publication-type", selected.publicationType],
        ["authority", selected.authority],
        ["q", selected.q]
      ];

      mappings.forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      const nextQuery = params.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}`;
      window.history.replaceState({}, "", nextUrl);
    };

    input && input.addEventListener("input", update);
    Object.values(filters).forEach((filter) => filter && filter.addEventListener("change", update));
    panel.querySelector("[data-clear-filters]")?.addEventListener("click", () => {
      if (input) input.value = "";
      Object.values(filters).forEach((filter) => {
        if (filter) filter.value = "";
      });
      update();
    });

    const params = new URLSearchParams(window.location.search);
    Object.entries({
      q: "search",
      category: "category",
      kind: "kind",
      topic: "topic",
      year: "year",
      english: "english",
      "scholarship-type": "scholarshipType",
      "source-language": "sourceLanguage",
      "publication-type": "publicationType",
      authority: "authority"
    }).forEach(([queryKey, filterName]) => {
      const control = filterName === "search" ? input : filters[filterName];
      const value = params.get(queryKey);
      if (control && value !== null && value !== undefined) {
        if (filterName === "search") {
          control.value = value;
        } else if ([...control.options].some((option) => option.value === value)) {
          control.value = value;
        }
      }
    });
    update();
  });
})();
