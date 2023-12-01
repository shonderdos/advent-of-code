import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day)
  .trim()
  .split("\n")
  .map((input) => {
    const regex = /[0-9]+/g;
    const instructionRegex = /(turn off|turn on|toggle)/g;

    return [
      ...input.match(instructionRegex),
      ...Array.from(input.match(regex)),
    ];
  });

const part1 = () => {
  console.log(data);
};

const part2 = () => {};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
