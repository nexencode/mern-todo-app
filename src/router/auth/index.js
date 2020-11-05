const express = require('express');
const { Router } = express;

const authRouter = Router();

// login rout
authRouter.post('/login', async (req, res) => {
    res.sendStatus(200);
})

// Register rout
authRouter.post('/register', async (req, res) => {
    res.sendStatus(201);
})

// logout rout
authRouter.get('/logout', async (req, res) => {
    res.sendStatus(200);
})

// We gonna export this module to the router/index.js
module.exports = {
    path: '/', // path is going to be under api itself
    router: authRouter
}
