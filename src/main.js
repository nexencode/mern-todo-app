const database = require('./modules/database');
const chalk = require('chalk');

// Chalk colors
const errorColor = chalk.bgRed.bold;
const successColor = chalk.bgGreen.bold;
/*  ----------------  */

// IIFE 
(async () => {
    console.info('Starting the app....');
    await database.connect();
    console.info(successColor('Connected to the Database.'));

})();