export const generateAcronym = (phrase) => {
  const smallWords = ["of", "and", "the", "in", "on"];
  return phrase
    .split(" ")
    .filter((word) => !smallWords.includes(word.toLowerCase())) // Exclude small words
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
