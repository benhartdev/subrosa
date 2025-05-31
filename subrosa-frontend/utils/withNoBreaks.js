export function withNoBreaks(str) {
  return str?.replaceAll(" ", "\u00A0").trim();
}
