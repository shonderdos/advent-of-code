import getInput from "../../../utils/getInput";
type Direction = "U" | "D" | "L" | "R";

class Knot {
  y: number;
  x: number;
  visited = new Set();

  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
    this.addNewPos();
  }

  move(y: number, x: number) {
    this.y += y;
    this.x += x;
  }

  addNewPos() {
    this.visited.add(`${this.y}x${this.x}`);
  }
}

class Grid {
  private knots: Knot[];

  constructor(knots: Knot[]) {
    this.knots = knots;
  }

  instructions([direction, amount]: [Direction, number]) {
    for (let j of Array(amount)) {
      switch (direction) {
        case "D":
          this.knots[0].move(1, 0);
          break;
        case "L":
          this.knots[0].move(0, -1);
          break;
        case "R":
          this.knots[0].move(0, 1);
          break;
        case "U":
          this.knots[0].move(-1, 0);
      }
      this.knots[0].addNewPos();
      this.moveT();
    }
  }

  moveT() {
    for (let i = 1; i < this.knots.length; i++) {
      const h = this.knots[i - 1];
      const t = this.knots[i];

      const distance = Math.hypot(h.y - t.y, h.x - t.x);

      if (distance > 2) {
        h.x < t.x ? t.move(0, -1) : t.move(0, 1);
        h.y < t.y ? t.move(-1, 0) : t.move(1, 0);
      } else {
        if (Math.abs(h.x - t.x) > 1) {
          h.x < t.x ? t.move(0, -1) : t.move(0, 1);
        }
        if (Math.abs(h.y - t.y) > 1) {
          h.y < t.y ? t.move(-1, 0) : t.move(1, 0);
        }
      }

      t.addNewPos();
    }
  }
}

const input = getInput("2022", "9")
  .trim()
  .split("\n")
  .map((x) => {
    const [dir, amount] = x.split(" ");
    return [dir, Number(amount)] as [Direction, number];
  });

const part1 = () => {
  let H = new Knot(0, 0);
  let T = new Knot(0, 0);
  let grid = new Grid([H, T]);
  input.forEach((i) => {
    grid.instructions(i);
  });

  return T.visited.size;
};

const part2 = () => {
  const array = Array.from(Array(10).keys()).map((_, index) => new Knot(0, 0));

  const grid = new Grid(array);

  input.forEach((i) => {
    grid.instructions(i);
  });

  return array[9].visited.size;
};

console.log(part1());
console.log(part2());
