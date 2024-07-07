const jwt = require('jsonwebtoken');

const generateToken = (id , role) => {
    return jwt.sign({ _id: id , role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

const generateRefreshToken = (id ) => {
    return jwt.sign({ _id: id  }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

module.exports = {
    generateToken,
    generateRefreshToken
}