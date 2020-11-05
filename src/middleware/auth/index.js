const config = require('../../config');
const AuthService = require('../../modules/services/auth');
const users = require('../../modules/services/users');

const badCookieError = new Error('Bad cookie');
const tokenError = new Error('Bad token');
const tokenuserNotFoundError = new Error('User not found');

// check every request

module.exports = async (req, res, next) => {
    try {
        // read cookie
        const authCookie = req.cookies[config.auth.authCookieName];
        if (!authCookie) throw badCookieError;

        //read token
        const userId = await AuthService.verifyTokenAndGetUserId(authCookie);
        if (!userId) throw tokenError;

        //read user
        res.user = await users.findById(userId);
        if (!res.user) throw tokenuserNotFoundError;
        
        // Allow us to go to the next rout handler
        next();
    } catch (error) {
        res.status(401);
        res.send(error.toString());
    }
}