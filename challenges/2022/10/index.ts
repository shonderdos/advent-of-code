import getInput from "../../../utils/getInput";
const cycles = [20, 60, 100, 140, 180, 220];
const data = getInput("2022", "10")
  .trim()
  .split("\n")
  .map((x) => x.split(" "));

let storeArr: number[] = [];
data.forEach(([instruction, amount]) => {
  if (!amount) return storeArr.push(0);
  storeArr.push(...[0, Number(amount)]);
});

const numbers = storeArr.reduce(
  (acc, currentValue) => {
    const l = acc.length;
    const newV = acc[l - 1] + currentValue;

    return [...acc, newV];
  },
  [1]
);
const part1 = () => {
  return cycles.reduce((total, cucleN) => {
    const x = numbers[cucleN - 1] * cucleN;

    return total + x;
  }, 0);
};

const part2 = () => {
  console.log(numbers);
  return numbers
    .map((value, index) => {
      return Math.abs((index % 40) - value) < 2 ? "#" : ".";
    })
    .join("")
    .match(/.{1,40}/g);
};

console.log(part1());
console.log(part2());
