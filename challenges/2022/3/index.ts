import getInput from "../../../utils/getInput";

const priority = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// @ts-ignore
const splitOn = (amount, arr): string[][] => {
  if (arr.length < amount) return arr;
  const x = arr.splice(0, amount);
  return [x, ...splitOn(amount, arr)];
};

const data = getInput("2022", "3").trim().split("\n");

const part1 = () => {
  return data
    .map((line) => line.split(""))
    .map((line): [string[], string[]] => {
      const firstHalf = line.splice(0, line.length / 2);
      return [firstHalf, line];
    })
    .map(([firstHalf, secondHalf]) => {
      return firstHalf.find((item) => {
        return secondHalf.includes(item);
      });
    })
    .map((item) => {
      // @ts-ignore
      return priority.indexOf(item) + 1;
    })
    .reduce((total, item) => total + item, 0);
};

const part2 = () => {
  // @ts-ignore
  return splitOn(3, data)
    .map((group) => group.map((elf) => elf.split("")))
    .map(([firstHalf, secondHalf, third]) => {
      // @ts-ignore
      return firstHalf.find((item) => {
        return secondHalf.includes(item) && third.includes(item);
      });
    })
    .map((item) => {
      // @ts-ignore
      return priority.indexOf(item) + 1;
    })
    .reduce((total, item) => total + item, 0);
};

// console.log(part1());
console.log(part2());
