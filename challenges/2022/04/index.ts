import getInput from "../../../utils/getInput";
const testInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
const part1 = () => {
  let count = 0;
  getInput("2022", "4")
    // testInput
    .trim()
    .split("\n")
    .map((x) =>
      x.split(",").map((y) => {
        const a = y.split("-");
        return a.map(Number);
      })
    )
    .map(([firstElf, secondElf]) => {
      if (
        (firstElf[0] >= secondElf[0] && firstElf[1] <= secondElf[1]) ||
        (secondElf[0] >= firstElf[0] && secondElf[1] <= firstElf[1])
      ) {
        count++;
      }
    });

  return count;
};

const part2 = () => {
  let count = 0;
  getInput("2022", "4")
    // testInput
    .trim()
    .split("\n")
    .map((x) =>
      x.split(",").map((y) => {
        const a = y.split("-");
        return a.map(Number);
      })
    )
    .map(([firstElf, secondElf]) => {
      if (
        (firstElf[0] >= secondElf[0] && firstElf[0] <= secondElf[1]) ||
        (firstElf[1] >= secondElf[0] && firstElf[1] <= secondElf[1]) ||
        (secondElf[0] >= firstElf[0] && secondElf[0] <= firstElf[1]) ||
        (secondElf[1] >= firstElf[0] && secondElf[1] <= firstElf[1])
      ) {
        count++;
      }
    });

  return count;
};

console.log(part1());
console.log(part2());
