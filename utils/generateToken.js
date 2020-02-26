const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = user => {
    const payload = {
        subject: user.id,
        role: user.role || 'user'
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, jwtSecret, options);
}