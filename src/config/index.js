// NOTE: freeze create object, but after that notihing can be change on that object!
const config = Object.freeze({
    app: {
        port: 3000,
    },
    db: {
        dbname: 'main',
        username: 'sedcuser',
        password: 'sedcpass'
    },
    auth: {
        secret: 'porsecretforjwt',
        jwtExpiresIn: '1h',
        authCookieName: 'auth',
        authCookieAgeInSeconds: 3600
    }
});

module.exports = config;
