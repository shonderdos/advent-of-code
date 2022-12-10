import getInput from "../../../utils/getInput";

const getResult = (arr, string) => {
  if (arr.length === 1) return arr[0];

  const firstChar = string.substring(0, 1);
  const splitArray = [arr.splice(0, arr.length / 2), arr];
  if (["L", "F"].includes(firstChar)) {
    return getResult(splitArray[0], string.substring(1));
  } else {
    return getResult(splitArray[1], string.substring(1));
  }
};

const data = getInput("2020", "5")
  .trim()
  .split("\n")
  .map((r) => [r.substring(0, 7), r.substring(7)])
  .map(([row, column]) => {
    return [
      getResult(Array.from(Array(128).keys()), row),
      getResult(Array.from(Array(8).keys()), column),
    ];
  })
  .map(([row, column]) => row * 8 + column);
const part1 = () => {
  return data.sort((a, b) => b - a)[0];
};

const part2 = () => {
  return (
    data
      .sort((a, b) => a - b)
      .reduce((prev, current, index) => {
        const offset = 63;
        return current - offset === index ? current : prev;
      }) + 1
  );
};

console.log(part1());
console.log(part2());
