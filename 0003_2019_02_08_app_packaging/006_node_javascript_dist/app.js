const _ = require("lodash");

console.error(`hello world: {${_.join(process.argv.slice(2), ",")}}`);