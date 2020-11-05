const express = require('express');
const { Router } = express;
const authMiddleware = require('../../middleware/auth');

const todosRouter = Router();

todosRouter.use(authMiddleware);

todosRouter.get('/', async (req, res) => {
    console.info('User: ', res.user);
    res.send('Data');
})

module.exports = {
    path: '/todos',
    router: todosRouter
}