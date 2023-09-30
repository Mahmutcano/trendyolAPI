const fs = require("fs-extra");
const path = require("path");

const buildDirectory = path.resolve(__dirname, "build");

fs.remove(buildDirectory)
  .then(() => {
    console.log("Build directory successfully removed!");
  })
  .catch((err) => {
    console.error("Error during the removal of the build directory!", err);
  });
