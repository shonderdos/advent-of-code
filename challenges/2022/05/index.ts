import getInput from "../../../utils/getInput";

const part1 = () => {
  const [containers, instructions] = getInput("2022", "5").split("\n\n");
  let stackedContainer = [[], [], [], [], [], [], [], [], []];
  containers
    .trim()
    .split("\n")
    .reverse()
    .splice(1, Infinity)
    .map((x) => x.match(/\s{4}|\[.\]/g) as any[])
    .map((x) => {
      x.map((y, index) => {
        if (y.includes(" ")) return;
        stackedContainer[index].push(y);
      });
    });

  const instructionsAsArray: string[] = instructions
    .trim()
    .split("\n")
    .map((x) => x.match(/\d+/g));

  const operateCrane = ([amount, from, to]) => {
    const pickedUp = stackedContainer[Number(from - 1)].splice(amount * -1);
    stackedContainer[Number(to - 1)].push(...pickedUp);
  };
  instructionsAsArray.forEach(operateCrane);
  return stackedContainer.map((x) => x.splice(-1));
};

const part2 = () => {};

console.log(part1());
console.log(`Solution 2: ${part2()}`);
