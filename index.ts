import { create, run } from "./utils/actions";
import { Language, languageMappings } from "./utils/language-mappings";
let [, , action, year, day, lang] = process.argv;
const isLang = (lang: string): lang is Language => {
  return Object.keys(languageMappings).includes(lang);
};
switch (action) {
  case "create":
    create(year, day, isLang(lang) ? lang : "ts");
    break;
  case "run":
    run(year, day);
    break;
  // to be implemented, might be useful for submitting solution
  // case "submit":
  //   submit(year, day);
  //   break;
  default:
    console.error("Please provide a valid action (create or run)");
}
