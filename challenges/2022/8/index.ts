import getInput from "../../../utils/getInput";
const data = getInput("2022", "8").trim();
const grid = data.split("\n").map((x) => x.split(""));

const part1 = () => {
  let pos: [number, number] = [0, 0];
  const updatePosition = () => {
    let [x, y] = pos;

    if (y === grid[0].length - 1) {
      y = 0;
      x++;
    } else {
      y++;
    }

    pos = [x, y];
  };
  const checkTopView = ([x, y]: [number, number]) => {
    // for (let pos of Array(x)) {
    //   console.log(pos);
    // }
    return Array.from(Array(x).keys()).every((posToCheck) => {
      return grid[posToCheck][y] < grid[x][y];
    });
  };
  const checkRightView = ([x, y]: [number, number]) => {
    return Array.from(Array(grid[0].length).keys())
      .slice(y + 1)
      .every((posToCheck) => {
        return grid[x][posToCheck] < grid[x][y];
      });
  };
  const checkBottomView = ([x, y]: [number, number]) => {
    return Array.from(Array(grid.length).keys())
      .slice(x + 1)
      .every((posToCheck) => {
        return grid[posToCheck][y] < grid[x][y];
      });
  };
  const checkLeftView = ([x, y]: [number, number]) => {
    return Array.from(Array(y).keys()).every((posToCheck) => {
      return grid[x][posToCheck] < grid[x][y];
    });
  };
  let total = 0;

  while (pos[0] < grid.length && pos[1] < grid[0].length) {
    if (!pos[0] || !pos[1] || pos[1] === grid[0].length - 1) {
      total++;
      updatePosition();
      continue;
    }

    total +=
      checkTopView(pos) ||
      checkRightView(pos) ||
      checkBottomView(pos) ||
      checkLeftView(pos)
        ? 1
        : 0;

    updatePosition();
  }
  return total;
};

const part2 = () => {
  let pos: [number, number] = [0, 0];
  const updatePosition = () => {
    let [x, y] = pos;

    if (y === grid[0].length - 1) {
      y = 0;
      x++;
    } else {
      y++;
    }

    pos = [x, y];
  };
  const checkTopView = ([x, y]: [number, number]): number => {
    let total = 0;
    for (let i of Array.from(Array(x).keys()).reverse()) {
      total++;
      if (grid[i][y] >= grid[x][y]) {
        break;
      }
    }
    return total;
  };

  const checkRightView = ([x, y]: [number, number]) => {
    let total = 0;
    for (let i of Array.from(Array(grid[0].length).keys()).slice(y + 1)) {
      total++;
      if (grid[x][i] >= grid[x][y]) {
        break;
      }
    }
    return total;
  };

  const checkBottomView = ([x, y]: [number, number]) => {
    let total = 0;
    for (let i of Array.from(Array(grid.length).keys()).slice(x + 1)) {
      total++;
      if (grid[i][y] >= grid[x][y]) {
        break;
      }
    }
    return total;
  };
  const checkLeftView = ([x, y]: [number, number]) => {
    let total = 0;
    for (let i of Array.from(Array(y).keys()).reverse()) {
      total++;
      if (grid[x][i] >= grid[x][y]) {
        break;
      }
    }
    return total;
  };

  const result = grid.map((a, aIndex) =>
    a.map((b, bIndex) => {
      return (
        checkTopView([aIndex, bIndex]) *
        checkRightView([aIndex, bIndex]) *
        checkBottomView([aIndex, bIndex]) *
        checkLeftView([aIndex, bIndex])
      );
    })
  );
  return Math.max(...result.map((x) => Math.max(...x)));
};

console.log(part1());
console.log(part2());
