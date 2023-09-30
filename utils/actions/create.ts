import { existsSync, mkdirSync, writeFileSync } from "fs";
import { cp } from "shelljs";
import {
  downloadInputForYearAndDay,
  getPuzzleDescription,
} from "../aoc-actions";
import { Language } from "../language-mappings";
import { prefixDay } from "../prefix-day";

export const create = async (year: string, day: string, lang: Language) => {
  const prefixedDay = prefixDay(day);
  let path = `./challenges/${year}/${prefixedDay}`;
  if (!existsSync(path)) {
    console.log(`Creating challenge to ${path} from template...`);
    mkdirSync(`challenges/${year}/${prefixedDay}`, { recursive: true });
    //Copy template
    cp("-rf", `template/${lang}/*`, path);
  }

  if (!existsSync(`${path}/input.txt`)) {
    console.log(`Downloading input...`);
    let input = await downloadInputForYearAndDay(day, year);
    writeFileSync(`${path}/input.txt`, input as string);
  }
  console.log(`Downloading README...`);
  let readme = await getPuzzleDescription(year, day);
  writeFileSync(`${path}/README.md`, readme as string);
};
