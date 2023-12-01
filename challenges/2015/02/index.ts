import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day)
  .trim()
  .split("\n")
  .map((dims) => dims.split("x").map(Number));
const part1 = () => {
  return data
    .map(([length, width, height]) => {
      return (
        2 * length * width +
        2 * width * height +
        2 * height * length +
        Math.min(length * width, width * height, height * length)
      );
    })
    .reduce((acc, curr) => acc + curr, 0);
};

const part2 = () => {
  return data
    .map((dims) => {
      const [first, second, third] = dims.sort((a, b) => a - b);
      return 2 * first + 2 * second + first * second * third;
    })
    .reduce((acc, curr) => acc + curr, 0);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
