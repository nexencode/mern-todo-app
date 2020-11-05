// NOTE: In this file we gonna define routes

const express = require('express');
const { Router } = express;

const auth = require('./auth');

const mainRouter = Router();


mainRouter.use(auth.path, auth.router);

module.exports = {
    path: '/api', //http://www/domain.com/api/...
    router: mainRouter
}
