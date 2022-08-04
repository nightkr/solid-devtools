import { log } from "@shared/utils"

const solidOnPage = window.Solid$$

if (solidOnPage) {
  log("Solid detected, loading adapter...")
  // code-split the adapter code into a separate file
  import("./adapter")
}

export {}
