export function getFirstWord(str) {
  const words = str.trim().split(/\s+/); // Split by any whitespace
  return words[0];
}
