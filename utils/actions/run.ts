import { existsSync, readdirSync } from "fs";
import { Language } from "../language-mappings";
import { spawn } from "child_process";
import { prefixDay } from "../prefix-day";

export function run(year: string, day: string) {
  const prefixedDay = prefixDay(day);
  const folder = `challenges/${year}/${prefixedDay}/`;
  const filesInFolder = readdirSync(folder);
  const extension = filesInFolder
    .find((e) => e.includes("index"))
    ?.split(".")[1] as Language;
  const file = `index.${extension}`;
  if (existsSync(folder + file)) {
    switch (extension) {
      case "rs":
      case "rust":
        spawn("cargo", ["run", folder + file], {
          stdio: "inherit",
          shell: true,
          cwd: folder,
        });
        break;
      default:
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
}
