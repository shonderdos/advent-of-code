import { create, run } from "./utils/actions";
let [, , action, year, day] = process.argv;
switch (action) {
  case "create":
    create(year, day);
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
