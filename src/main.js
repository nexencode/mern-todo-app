const database = require('./modules/database');
const chalk = require('chalk');
const config = require('./config');


// Chalk colors
const errorColor = chalk.bgRed.bold;
const successColor = chalk.bgGreen.bold;
/*  ----------------  */

// IIFE 
(async () => {
    console.info('---------------------');
    console.info('Starting the app....');
    console.info('Connecting to the DB....');
    await database.connect();
    console.info(successColor('Connected to the Database.'));

    console.info('---------------------');

    console.info('Creating the express app...');
    
    const express = require('express');
    const router = require('./router');
    const app = express();

    console.info('---------------------');

    console.info('Registering the routes....');
    app.use(router.path, router.router);

    console.info('---------------------');

    console.info('Starting the express app...');

    app.listen(config.app.port, () => {
        console.info(successColor(`Server listening on port: ${config.app.port}...`));
    })
    console.info('---------------------');
})();