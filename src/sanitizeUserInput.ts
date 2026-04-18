export function sanitizeUserInput(input: unknown): string {
  let value = String(input);

  value = value.trim();
  value = value.replace(/<\s*script/gi, "");
  value = value.replace(/[<>]/g, "");
  value = value.replace(/\s+/g, " ");

  if (value[0] === '"' && value[value.length - 1] === '"') {
    value = value.slice(1, -1);
  }

  if (value.includes("\n")) {
    value = value.split("\n").join(" ");
  }

  return value;
}
