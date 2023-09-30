import getInput from "../../../utils/getInput";

const rucksacks = getInput("2022", "3").trim().split("\n");

const recurringItem = ([first, ...rest]: string[][]) => {
  const find = first.find((item) => rest.some((i) => i.includes(item)));

  if (find) return find;

  throw new Error("No matching symbol found");
};
const priority = (item: string) =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item) + 1;
const total = (total: number, item: number) => total + item;

const part1 = () => {
  return rucksacks
    .map((rucksack) => rucksack.split(""))
    .map((rucksack) => [rucksack.splice(0, rucksack.length / 2), rucksack])
    .map(recurringItem)
    .map(priority)
    .reduce(total, 0);
};

const part2 = () => {
  const groupBy3 = ([first, ...rest]: string[][], rucksack: string) =>
    first.length < 3
      ? [[...first, rucksack], ...rest]
      : [[rucksack], first, ...rest];

  return rucksacks
    .reduce(groupBy3, [[]])
    .map((group) => group.map((elf) => elf.split("")))
    .map(recurringItem)
    .map(priority)
    .reduce(total, 0);
};

console.log(part1());
console.log(part2());
