import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day)
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const part1 = () => {
  const symbolCoordinates = new Set<string>();
  const numberCoordinatesAdjacentToSymbol = new Set<string>();
  const checkedCoordinates = new Set<string>();
  const validSerialNumbers = new Array();
  data.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== "." && isNaN(Number(symbol))) {
        symbolCoordinates.add(`${x},${y}`);
      }
    });
  });
  symbolCoordinates.forEach((coordinate) => {
    const [x, y] = coordinate.split(",").map(Number);
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (data[j] && data[j][i] && !isNaN(Number(data[j][i]))) {
          numberCoordinatesAdjacentToSymbol.add(`${i},${j}`);
        }
      }
    }
  });
  numberCoordinatesAdjacentToSymbol.forEach((coordinate) => {
    const [x, y] = coordinate.split(",").map(Number);
    let pointer = x;
    let currentSerialNumber: string | undefined;
    if (checkedCoordinates.has(coordinate)) {
      return;
    }
    while (!isNaN(Number(data[y][pointer]))) {
      checkedCoordinates.add(`${pointer},${y}`);
      if (currentSerialNumber === undefined) {
        currentSerialNumber = data[y][pointer];
      } else {
        currentSerialNumber = `${data[y][pointer]}${currentSerialNumber}`;
      }
      pointer--;
    }
    pointer = x + 1;
    while (!isNaN(Number(data[y][pointer]))) {
      checkedCoordinates.add(`${pointer},${y}`);
      if (currentSerialNumber === undefined) {
        currentSerialNumber = data[y][pointer];
      } else {
        currentSerialNumber = `${currentSerialNumber}${data[y][pointer]}`;
      }
      pointer++;
    }
    if (currentSerialNumber !== undefined) {
      validSerialNumbers.push(Number(currentSerialNumber));
    }
  });
  console.log(validSerialNumbers);
  return validSerialNumbers.reduce((acc, cur) => acc + cur);
};

const part2 = () => {
  const symbolCoordinates = new Map<string, string[]>();
  data.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === "*") {
        symbolCoordinates.set(`${x},${y}`, []);
      }
    });
  });

  for (const [coordinate, serialNumbers] of symbolCoordinates) {
    const checkedCoordinates = new Set<string>();
    const [x, y] = coordinate.split(",").map(Number);
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (data[j] && data[j][i] && !isNaN(Number(data[j][i]))) {
          if (checkedCoordinates.has(`${i},${j}`)) {
            continue; // we've already checked this coordinate
          }
          let pointer = i;
          let currentSerialNumber: string | undefined;
          while (!isNaN(Number(data[j][pointer]))) {
            checkedCoordinates.add(`${pointer},${j}`);
            if (currentSerialNumber === undefined) {
              currentSerialNumber = data[j][pointer];
            } else {
              currentSerialNumber = `${data[j][pointer]}${currentSerialNumber}`;
            }
            pointer--;
          }
          pointer = i + 1;
          while (!isNaN(Number(data[j][pointer]))) {
            checkedCoordinates.add(`${pointer},${j}`);
            if (currentSerialNumber === undefined) {
              currentSerialNumber = data[j][pointer];
            } else {
              currentSerialNumber = `${currentSerialNumber}${data[j][pointer]}`;
            }
            pointer++;
          }
          serialNumbers.push(currentSerialNumber);
        }
      }
    }
  }
  symbolCoordinates.forEach((value, key) => {
    if (value.length !== 2) {
      symbolCoordinates.delete(key);
      return;
    }
    symbolCoordinates.set(
      key,
      value.reduce((acc, cur) => Number(acc) * Number(cur))
    );
  });

  return [...symbolCoordinates.values()].reduce((acc, cur) => acc + cur);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
