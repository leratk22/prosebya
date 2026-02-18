/**
 * Заменяет прямые кавычки " и ' на типографские «ёлочки» в русской типографике.
 * Чередует открывающие « и закрывающие » для пар кавычек.
 */
function replaceQuotes(str: string, quoteChar: string): string {
  const parts = str.split(quoteChar);
  if (parts.length <= 1) return str;
  let result = parts[0];
  for (let i = 1; i < parts.length; i++) {
    result += (i % 2 === 1 ? "«" : "»") + parts[i];
  }
  return result;
}

export function withRussianQuotes(str: string): string {
  if (typeof str !== "string") return str;
  return replaceQuotes(replaceQuotes(str, '"'), "'");
}
