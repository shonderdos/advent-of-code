import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day).trim().split("\n");

const part1 = () => {
  return data
    .map((line) => {
      const firstNumber = [...line].find((char) =>
        Number.isInteger(Number(char))
      );
      const lastNumber = [...line]
        .reverse()
        .find((char) => Number.isInteger(Number(char)));
      return Number(`${firstNumber}${lastNumber}`);
    })
    .reduce((acc, curr) => acc + curr);
};

const part2 = () => {
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return data
    .map((line) => {
      let newLine = "";

      const queue = [...line];

      while (queue.length) {
        newLine += queue.shift();
        numbers.forEach((number) => {
          if (newLine.indexOf(number) >= 0) {
            newLine = newLine.replace(
              number,
              `${number[0]}${String(numbers.indexOf(number) + 1)}${number.slice(
                -1
              )}`
            );
          }
        });
      }
      return newLine;
    })
    .map((line) => {
      const firstNumber = [...line].find((char) =>
        Number.isInteger(Number(char))
      );
      const lastNumber = [...line]
        .reverse()
        .find((char) => Number.isInteger(Number(char)));

      return Number(`${firstNumber}${lastNumber}`);
    })
    .reduce((acc, curr) => acc + curr);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
