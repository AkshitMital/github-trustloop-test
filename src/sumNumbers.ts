export function sumNumbers(input: unknown): number {
  const values = Array.isArray(input) ? input : [input];
  let total = 0;

  for (const value of values) {
    if (typeof value === "string") {
      total += parseFloat(value);
      continue;
    }

    total += Number(value);
  }

  return Math.round(total * 100) / 100;
}
