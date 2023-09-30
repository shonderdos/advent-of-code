import getInput from "../../../utils/getInput";

type ElfHand = "A" | "B" | "C";
type OwnHand = "X" | "Y" | "Z";

const data = getInput("2022", "2")
  .trim()
  .split("\n")
  .map((lines) => lines.split(" ") as [ElfHand, OwnHand]);

const result = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2, Z: 6 },
};

const part1 = () => {
  return data
    .map(([elfHand, ownHand]) => result[elfHand][ownHand])
    .reduce((total, gamePoints) => total + gamePoints, 0);
};

const part2 = () => {
  const transform: { [key in ElfHand]: { [key in OwnHand]: OwnHand } } = {
    A: { X: "Z", Y: "X", Z: "Y" },
    B: { X: "X", Y: "Y", Z: "Z" },
    C: { X: "Y", Y: "Z", Z: "X" },
  };

  return data
    .map(([elfHand, ownHand]): [ElfHand, OwnHand] => [
      elfHand,
      transform[elfHand][ownHand],
    ])
    .map(([elfHand, ownHand]) => result[elfHand][ownHand])
    .reduce((total, gamePoints) => total + gamePoints, 0);
};
console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
