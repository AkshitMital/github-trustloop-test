function buildSearchQuery(input) {
  const payload = input || {};
  const query = new URLSearchParams();

  if (payload.term) {
    query.set("q", String(payload.term).trim());
  }

  if (payload.page) {
    query.set("page", String(payload.page));
  }

  if (payload.filters) {
    for (const key in payload.filters) {
      const value = payload.filters[key];

      if (Array.isArray(value)) {
        query.set(key, value.join(","));
      } else if (value !== undefined) {
        query.set(key, String(value));
      }
    }
  }

  if (payload.sort) {
    query.set("sort", payload.sort);
  }

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

module.exports = buildSearchQuery;
