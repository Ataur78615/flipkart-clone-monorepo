const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '365d', // Token 365 din mein expire ho jayega

    });
};
 module.exports = generateToken;