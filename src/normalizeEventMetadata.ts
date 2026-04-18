type EventMetadata = Record<string, string | number | boolean>;

export function normalizeEventMetadata(input: any): EventMetadata {
  const payload = input || {};
  const metadata = payload.metadata || payload;
  const normalized: EventMetadata = {};

  for (const key of Object.keys(metadata)) {
    const value = metadata[key];

    if (value === undefined || value === null || value === "") {
      continue;
    }

    if (typeof value === "string") {
      normalized[key.trim().toLowerCase()] = value.trim();
      continue;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      normalized[key.trim().toLowerCase()] = value;
      continue;
    }

    if (Array.isArray(value)) {
      normalized[key.trim().toLowerCase()] = value.join(",");
      continue;
    }

    normalized[key.trim().toLowerCase()] = JSON.stringify(value);
  }

  if (payload.timestamp && !normalized.timestamp) {
    normalized.timestamp = String(payload.timestamp);
  }

  return normalized;
}
