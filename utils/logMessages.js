const chalk = require('chalk');

const defaultLog = arguments => console.log(chalk.bold.white(arguments));

module.exports = {
  defaultLog
};