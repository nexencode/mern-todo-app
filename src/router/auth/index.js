const express = require('express');
const { Router } = express;
const usersService = require('../../modules/services/users');


const authRouter = Router();

// Register rout
authRouter.post('/register', async (req, res) => {

    try {
        const { body } = req;

        console.info('Register endpoint req body: ', body);
        await usersService.create(body);
        
        res.sendStatus(201);
    } catch (error) {
        console.info('Registration eroor: ', error);
        res.sendStatus(400);
    }
    
})

// login rout
authRouter.post('/login', async (req, res) => {
    res.sendStatus(200);
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
