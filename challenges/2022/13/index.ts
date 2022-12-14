import getInput from "../../../utils/getInput";
const data = getInput("2022", "13")
  .trim()
  .split("\n\n")
  .map((x) => x.split("\n"))
  .map((x) => x.map(JSON.parse));

const isCorrectOrder = (left: any[], right: any[]): number | null => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) return 1;
    if (right < left) return 0;
    return null;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      const isCorrect = isCorrectOrder(left[i], right[i]);
      if (isCorrect != null) return isCorrect;
    }

    if (left.length < right.length) return 1;
    if (right.length < left.length) return 0;
    return null;
  }

  return isCorrectOrder(
    Number.isInteger(left) ? [left] : left,
    Number.isInteger(right) ? [right] : right
  );
};

const part1 = () => {
  let counter = 0;
  data.forEach(([left, right], index) => {
    if (isCorrectOrder(left, right)) {
      counter = counter + index + 1;
    }
  });
  return counter;
};

const part2 = () => {
  const dividerA = [[2]];
  const dividerB = [[6]];

  return data
    .reduce((acc, curr) => [...acc, ...curr], [dividerA, dividerB])
    .sort((a, b) => (isCorrectOrder(b, a) ? 1 : -1))
    .reduce((acc, curr, index) => {
      if (curr === dividerB || curr === dividerA) acc.push(index + 1);
      return acc;
    }, [] as number[])
    .reduce((acc, curr) => acc * curr);
};

console.log(part1());
console.log(part2());
