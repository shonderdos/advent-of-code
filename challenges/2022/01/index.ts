import getInput from "../../../utils/getInput";

const data = getInput("2022", "1")
  .split("\n\n")
  .map((line) =>
    line.split("\n").reduce((total, calories) => {
      return total + Number(calories);
    }, 0)
  );

const part1 = () => {
  return data.sort((a, b) => b - a)[0];
};

const part2 = () => {
  return data
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((total, current) => total + Number(current), 0);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
