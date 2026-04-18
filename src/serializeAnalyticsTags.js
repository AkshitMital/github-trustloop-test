function serializeAnalyticsTags(input) {
  const payload = input || {};
  const tags = payload.tags || payload;
  const pairs = [];

  for (const key in tags) {
    const value = tags[key];

    if (value === undefined || value === null || value === "") {
      continue;
    }

    if (Array.isArray(value)) {
      pairs.push(`${key}=${value.join("|")}`);
      continue;
    }

    if (typeof value === "object") {
      pairs.push(`${key}=${JSON.stringify(value)}`);
      continue;
    }

    pairs.push(`${key}=${String(value).trim()}`);
  }

  if (payload.source) {
    pairs.unshift(`source=${payload.source}`);
  }

  return pairs.join("&");
}

module.exports = serializeAnalyticsTags;
