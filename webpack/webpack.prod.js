const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "../production"),
    filename: "index-bundle.js",
  },
};
