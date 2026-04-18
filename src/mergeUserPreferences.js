function mergeUserPreferences(input) {
  const payload = input || {};
  const defaults = {
    theme: "light",
    locale: "en-US",
    notifications: true,
    shortcuts: [],
    dashboard: {
      compact: false,
      widgets: ["orders", "activity"],
    },
  };

  const source = payload.preferences || payload;
  const merged = {
    ...defaults,
    ...source,
    dashboard: {
      ...defaults.dashboard,
      ...(source.dashboard || {}),
    },
  };

  if (merged.shortcuts && !Array.isArray(merged.shortcuts)) {
    merged.shortcuts = String(merged.shortcuts).split(",");
  }

  if (payload.role === "guest") {
    merged.notifications = false;
  }

  merged.shortcuts = (merged.shortcuts || []).map((shortcut) =>
    String(shortcut).trim().toLowerCase()
  );

  return merged;
}

module.exports = mergeUserPreferences;
