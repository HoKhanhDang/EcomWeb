const jwt = require('jsonwebtoken');
const handler = require('express-async-handler');

const verifyToken = handler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1].replace(/"/g, '');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Not authorized, token failed');
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401);
        throw new Error('Not authorized, token failed');
    } 


});

module.exports ={
    verifyToken
};