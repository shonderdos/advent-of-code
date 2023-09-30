import getInput from "../../../utils/getInput";

const part1 = () => {
  const data = getInput("2015", "01");
  const floors_up = data.match(/\(/g)?.length ?? 0;
  const floors_down = data.match(/\)/g)?.length ?? 0;
  return floors_up - floors_down;
};

const part2 = () => {
  const data = getInput("2015", "01");
  let floor = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "(") floor++;
    else floor--;
    if (floor === -1) return i + 1;
  }
  return -1;
};

console.log(part1());
console.log(part2());
