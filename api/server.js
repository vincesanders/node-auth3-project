const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter');
const userRouter = require('../user/userRouter');

const server = express();
server.use(helmet(), express.json(), cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'It is alive!!!' });
});

module.exports = server;