import getInput from "../../../utils/getInput";
const data = getInput("2022", "14")
  .trim()
  .split("\n")
  .map((x) => x.split(" ").map((y) => y.split(",").map((z) => Number(z))));

const lowest = Math.min(...data.flatMap((x) => x.flatMap((y) => y)));
const highest = Math.max(...data.flatMap((x) => x.flatMap((y) => y)));

const part1 = () => {
  console.log(highest);
  return lowest;
};

const part2 = () => {};

console.log(part1());
console.log(part2());
