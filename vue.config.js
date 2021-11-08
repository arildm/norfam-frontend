// import path from "path";
const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: { "@gui": path.resolve(__dirname, "lib/GUITemplate/") },
    },
  },
};
