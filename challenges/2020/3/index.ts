import getInput from "../../../utils/getInput";

const rawData = getInput("2020", "3");

const slopeTreeCounter = (rawData, traversingPatternX, traversingPatternY) => {
  const rawDataAsArray = rawData.split("\n");
  const slopeWidth = rawData.indexOf("\n");
  let treeCounter = 0;

  let posX = 0; //horizontal
  let posY = 0; //vertical
  while (posY < rawDataAsArray.length) {
    const slopeRow = rawDataAsArray[posY];
    const slopeColumn = posX % slopeWidth;

    const positionValue = slopeRow.charAt(slopeColumn);
    if (positionValue === "#") {
      treeCounter++;
    }

    posX += traversingPatternX;
    posY += traversingPatternY;
  }

  return treeCounter;
};

const part1 = () => {
  return slopeTreeCounter(rawData, 3, 1);
};

const part2 = () => {
  return (
    slopeTreeCounter(rawData, 1, 1) *
    slopeTreeCounter(rawData, 3, 1) *
    slopeTreeCounter(rawData, 5, 1) *
    slopeTreeCounter(rawData, 7, 1) *
    slopeTreeCounter(rawData, 1, 2)
  );
};

console.log(part1());
console.log(part2());
