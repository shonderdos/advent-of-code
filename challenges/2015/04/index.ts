import getInput from "../../../utils/getInput";
const md5 = require("md5");
const [, , year, day] = process.argv;
const data = getInput(year, day).trim();

const part1 = () => {
  let i = 0;
  while (true) {
    const hash = md5(`${data}${i}`);
    if (hash.startsWith("00000")) {
      return i;
    }
    i++;
  }
};

const part2 = () => {
  let i = 0;
  while (true) {
    const hash = md5(`${data}${i}`);
    if (hash.startsWith("000000")) {
      return i;
    }
    i++;
  }
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
