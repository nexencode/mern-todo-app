// NOTE: In this file we gonna define routes

const express = require('express');
const { Router } = express;

const auth = require('./auth');
const todos = require('./todos');

const mainRouter = Router();

// This will anable that all routs under the main route automaticlly parsed 
mainRouter.use(express.json());

mainRouter.use(auth.path, auth.router);
mainRouter.use(todos.path, todos.router);

module.exports = {
    path: '/api', //http://www/domain.com/api/...
    router: mainRouter
}
