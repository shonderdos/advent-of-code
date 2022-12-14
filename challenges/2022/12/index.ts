import getInput from "../../../utils/getInput";

class Board {
  openSet: Cell[] = [];
  closedSet: Cell[] = [];
  grid;
  start: Cell; // find start Pos and store
  end: Cell; // find end pos and store

  constructor(grid: string[][], [startPosY, startPosX]: [number, number]) {
    this.grid = this.gridToCells(grid);
    this.start = this.grid[startPosY][startPosX];
    this.end = this.setStartAndEnd("E");
    this.start.stepIndex = 0;
    this.end.stepIndex = 25;
    this.openSet.push(this.start);
  }

  private gridToCells(grid: string[][]): Cell[][] {
    return grid.map((y, yIndex) =>
      y.map((value, xIndex) => new Cell(yIndex, xIndex, value, grid))
    );
  }

  private setStartAndEnd(searchValue: string): Cell {
    for (let y = 0; y < this.grid.length - 1; y++) {
      for (let x = 0; x < this.grid[y].length - 1; x++) {
        if (this.grid[y][x].value === searchValue) {
          return this.grid[y][x];
        }
      }
    }
    throw new Error("searchValue not found in grid");
  }

  public finding() {
    while (this.openSet.length !== 0) {
      const current = this.openSet.sort((a, b) => a.f - b.f).shift() as Cell;
      if (current === this.end) {
        return current.f;
      }

      this.closedSet.push(current);

      current.neighbors.forEach(([y, x]) => {
        const neighbor = this.grid[y][x];
        const differenceInStepIndex = neighbor.stepIndex - current.stepIndex;

        if (!this.closedSet.includes(neighbor) && differenceInStepIndex < 2) {
          const temp = current.g + 1;
          if (this.openSet.includes(neighbor)) {
            if (temp < neighbor.g) {
              neighbor.g = temp;
            }
          } else {
            neighbor.g = temp;
            this.openSet.push(neighbor);
          }

          neighbor.h = Math.hypot(
            this.end.y - neighbor.y,
            this.end.x - neighbor.x
          );
          neighbor.f = neighbor.g + neighbor.h;
        } else {
        }
      });
    }
    return Infinity;
  }
}

class Cell {
  steps = "abcdefghijklmnopqrstuvwxyz";
  stepIndex: number;
  value: string;
  neighbors: number[][] = [];
  f = 0;
  g = 0;
  h = 0;
  x: number;
  y: number;

  constructor(y: number, x: number, value: string, grid: string[][]) {
    this.value = value;
    this.stepIndex = this.steps.indexOf(value);
    this.y = y;
    this.x = x;

    this.addNeighbors(grid);
  }

  private addNeighbors(grid: string[][]) {
    if (this.y !== 0) this.neighbors.push([this.y - 1, this.x]);
    if (this.x !== 0) this.neighbors.push([this.y, this.x - 1]);
    if (this.y !== grid.length - 1) this.neighbors.push([this.y + 1, this.x]);
    if (this.x !== grid[0].length - 1)
      this.neighbors.push([this.y, this.x + 1]);
  }
}

const data = getInput("2022", "12")
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const lookup = (data, chars) => {
  return data.reduce(
    (acc, y, yIndex) => [
      ...acc,
      ...y.reduce(
        (acc, x, xIndex) =>
          chars.includes(x) ? [...acc, [Number(yIndex), Number(xIndex)]] : acc,
        []
      ),
    ],
    []
  );
};
const part1 = () => {
  const startPos = lookup(data, ["S"]);

  return Math.min(
    ...startPos.map((startPos) => {
      return new Board(data, startPos).finding();
    })
  );
};

const part2 = () => {
  const startPos = lookup(data, ["S", "a"]);

  return Math.min(
    ...startPos.map((startPos) => {
      return new Board(data, startPos).finding();
    })
  );
};

console.log(part1());
console.log(part2());
