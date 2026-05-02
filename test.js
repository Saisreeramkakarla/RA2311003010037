console.log("START");

const Log = require("./logging_middleware/log");

async function run() {
  console.log("CALLING...");
  await Log("backend", "error", "handler", "test log");
  console.log("DONE");
}

run();