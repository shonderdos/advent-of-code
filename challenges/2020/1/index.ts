import getInput from "../../../utils/getInput";
const obj = getInput("2020", "1")
  .trim()
  .split("\n")
  .map((n) => Number(n));

const part1 = () => {
  const indexArr = [0, 1];
  const isCorrectCombination = (arr, indexArr, expectedResult) => {
    return (
      indexArr.map((index) => arr[index]).reduce((acc, curr) => acc + curr) ===
      expectedResult
    );
  };

  const getResult = (arr, indexArr) => {
    return indexArr
      .map((index) => arr[index])
      .reduce((acc, curr) => acc * curr);
  };

  const increaseIndexArr = (indexArr, maxIndex) => {
    let lastIndex = indexArr.pop();
    lastIndex++;

    if (lastIndex > maxIndex) {
      lastIndex = [...indexArr].reverse().shift() + 1;
      increaseIndexArr(indexArr, maxIndex);
    }

    indexArr.push(lastIndex);
  };

  while (!isCorrectCombination(obj, indexArr, 2020)) {
    increaseIndexArr(indexArr, obj.length);
  }

  return getResult(obj, indexArr);
};

const part2 = () => {
  const indexArr = [0, 1, 2];
  const isCorrectCombination = (arr, indexArr, expectedResult) => {
    return (
      indexArr.map((index) => arr[index]).reduce((acc, curr) => acc + curr) ===
      expectedResult
    );
  };

  const getResult = (arr, indexArr) => {
    return indexArr
      .map((index) => arr[index])
      .reduce((acc, curr) => acc * curr);
  };

  const increaseIndexArr = (indexArr, maxIndex) => {
    let lastIndex = indexArr.pop();
    lastIndex++;

    if (lastIndex > maxIndex) {
      lastIndex = [...indexArr].reverse().shift() + 1;
      increaseIndexArr(indexArr, maxIndex);
    }

    indexArr.push(lastIndex);
  };

  while (!isCorrectCombination(obj, indexArr, 2020)) {
    increaseIndexArr(indexArr, obj.length);
  }

  return getResult(obj, indexArr);
};

console.log(part1());
console.log(part2());
