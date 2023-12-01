import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day).trim().split("\n");

const part1 = () => {
  return data.filter((word) => {
    return (
      minimumAmountOfVowels(3)(word) &&
      minimumAmountOfOccurrences(1)(word) &&
      !forbiddenCharacters(["ab", "cd", "pq", "xy"])(word)
    );
  }).length;
};

const part2 = () => {
  return data.filter((word) => {
    return (
      part2MinimumAmountOfOccurrences(word) &&
      hasRepeatingLetterWithOneLetterBetween(word)
    );
  }).length;
};

const minimumAmountOfVowels =
  (amount: number) =>
  (word: string): boolean => {
    const vowels = word.match(/[aeiou]/g);
    return vowels ? vowels.length >= amount : false;
  };

const minimumAmountOfOccurrences =
  (amount: number) =>
  (word: string): boolean => {
    const occurrences = word.match(/(.)\1/g);
    return occurrences ? occurrences.length >= amount : false;
  };

const forbiddenCharacters =
  ([...characters]: string[]) =>
  (word: string) => {
    return characters.some((character) => word.includes(character));
  };

const part2MinimumAmountOfOccurrences = (word: string): boolean => {
  const occurrences = word.match(/(..).*\1/g);
  return occurrences ? occurrences.length >= 1 : false;
};

const hasRepeatingLetterWithOneLetterBetween = (word: string): boolean => {
  const occurrences = word.match(/(.).\1/g);
  return occurrences ? occurrences.length >= 1 : false;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
