const express = require('express');
const { Router } = express;
const usersService = require('../../modules/services/users');
const AuthService = require('../../modules/services/auth');
const { validateKeysExist } = require('../../modules/helpers');
const config = require('../../config');
const { reset } = require('nodemon');

const authRouter = Router();

// Register rout
authRouter.post('/register', async (req, res) => {

    try {
        const { body } = req;

        console.info('Register endpoint req body: ', body);
        const hashedPassword = await AuthService.hashPassword(body.password);
        
        const user = {
            ...body,
            password: hashedPassword
        }

        await usersService.create(user);
        
        res.sendStatus(201);
    } catch (error) {
        console.info('Registration eroor: ', error);
        res.sendStatus(400);
    }
    
})

// login rout
authRouter.post('/login', async (req, res) => {
    try {
        // grab the body
        const { body } = req;
        console.info('Login Body: ', body);
        validateKeysExist(['password', 'email'], body);

        // grab user
        const user = await usersService.findByEmail(body.email);
        if (!user) {
            res.sendStatus(404);
        }

        // compare passwords
        const passwordMatch = await AuthService.comparePassword(body.password, user.password);
        if (!passwordMatch) {
            res.sendStatus(401);
        }

        //generate token
        const token = await AuthService.generateToken(user);

        //cookies
        res.cookie(config.auth.authCookieName, token, {
            // when set to true, then js can't access them on frontend
            httpOnly: true,
            expires: new Date(Date.now() + config.auth.authCookieAgeInSeconds * 1000)
        })

        //Send OK Status if everithing is ok! 
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(400);
        console.info('Login eroor: ', error);
    }
})


// logout rout
authRouter.get('/logout', async (req, res) => {
    // reset cookie, override old cookie with imediatlly expiraton time
    res.cookie(config.auth.authCookieName, '', { expires: new Date()})
    res.sendStatus(200);
})

// We gonna export this module to the router/index.js
module.exports = {
    path: '/', // path is going to be under api itself
    router: authRouter
}
