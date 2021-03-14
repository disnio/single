const genConfig = require("../../build/gen-config");
let config = genConfig(process, __dirname);
console.log("config: ", config);
module.exports = config;