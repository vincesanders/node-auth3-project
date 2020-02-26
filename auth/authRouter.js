const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../user/userModel');
const generateToken = require('../utils/generateToken');

router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    let user = { username, password, role };
    const hash = bcrypt.hashSync(user.password, 8); //higher in production
    user.password = hash;

    users.insert(user).then(addedUser => {
        const token = generateToken(addedUser);
        res.status(201).json({ user: addedUser, token });
    }).catch(({ error, message, stack }) => {
        console.log(`Error: ${error}\nMessage: ${message}\n Stack: ${stack}`);
        res.status(500).json({ error, message, stack, errorMessage: 'Unable to register user.' });
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    users.getBy({ username }).then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome back, ${username}!`, token});
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }).catch(({error, message, stack}) => {
        console.log(`Error: ${error}\nMessage: ${message}\n Stack: ${stack}`);
        res.status(500).json({ error, message, stack, errorMessage: 'Unable to register user.' });
    });
})

module.exports = router;