const chalk = require('chalk');

const defaultLog = msg => console.log(chalk.bold(msg));

module.exports = {
  defaultLog
};