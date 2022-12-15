import getInput from "../../../utils/getInput";

const data = getInput("2022", "15")
  .trim()
  .split("\n")
  .map((x) => {
    let y = x.split(", ").map((n) => Number(n));
    return [y.splice(0, 2), y];
  });

const part1 = () => {
  const TARGET_ROW = 2000000;
  const coveredArea = new Set<number>();
  data.forEach(([[sensorX, sensorY], [beaconX, beaconY]]) => {
    const range = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    const distanceToTargetRow = Math.abs(sensorY - TARGET_ROW);
    const signalStrengthOnTargetLine = range - distanceToTargetRow;

    if (signalStrengthOnTargetLine > 0) {
      const positions = Array.from(
        new Array(signalStrengthOnTargetLine * 2 + 1).keys()
      ).map((x) => {
        return x + (sensorX - signalStrengthOnTargetLine);
      });
      for (let item of positions) {
        coveredArea.add(item);
      }
    }
  });

  return coveredArea.size;
};

const part2 = () => {
  const SIZE = 4000000;
  const cal = (rowNumber) => {
    let ranges = [];
    for (let i = 0; i < data.length; i++) {
      const [[sensorX, sensorY], [beaconX, beaconY]] = data[i];
      const range = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
      const distanceToTargetRow = Math.abs(sensorY - rowNumber);
      const signalStrengthOnTargetLine = range - distanceToTargetRow;

      if (signalStrengthOnTargetLine > 0) {
        const startingPos = Math.max(sensorX - signalStrengthOnTargetLine, 0);
        const endPos = Math.min(sensorX + signalStrengthOnTargetLine, SIZE);

        if (ranges.length == 0) ranges.push([startingPos, endPos]);
        else {
          let currentRange = [startingPos, endPos];
          for (let i = ranges.length - 1; i >= 0; i--) {
            if (
              currentRange[0] <= ranges[i][1] &&
              ranges[i][0] <= currentRange[1]
            ) {
              currentRange[0] = Math.min(currentRange[0], ranges[i][0]);
              currentRange[1] = Math.max(currentRange[1], ranges[i][1]);
              ranges.splice(i, 1);
            }
          }
          ranges.push(currentRange);
        }
      }
    }

    if (!(ranges[0][0] == 0 && ranges[0][1] == SIZE))
      return (ranges[0][1] + 1) * 4000000 + rowNumber;
  };
  for (let step = 0; step < SIZE; step++) {
    const r = cal(step);
    if (r) return r;
  }
};

console.log(part1());
console.log(part2());
