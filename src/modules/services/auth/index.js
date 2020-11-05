const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const config = require('../../../config');

class AuthService {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async generateToken(user) {
        return JWT.sign({}, config.auth.secret, {
            subject: `${user._id}`,
            expiresIn: config.auth.jwtExpiresIn
        })
    }

    static async verifyTokenAndGetUserId(token) {
        return JWT.verify(toke, config.auth.secret);
    }


}

module.exports = AuthService;