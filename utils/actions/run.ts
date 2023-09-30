import { existsSync } from "fs";
import { spawn } from "child_process";
import { prefixDay } from "../prefix-day";

export function run(year: string, day: string) {
  const prefixedDay = prefixDay(day);
  if (existsSync(`challenges/${year}/${prefixedDay}/index.ts`)) {
    spawn(
      "nodemon",
      [
        "-x",
        "ts-node",
        `challenges/${year}/${prefixedDay}/index.ts ${year} ${day}`,
      ],
      {
        stdio: "inherit",
        shell: true,
      }
    );
  }
}
