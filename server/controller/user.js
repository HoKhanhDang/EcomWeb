const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const response = await User.create(req.body);

    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });
});

const login = asyncHandler(async (req, res) => {

    const {email, password } = req.body;

    console.log(req.body);
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const response = await User.findOne({email});
    if (response && await response.matchPassword(password)) {
        const {password,...rest} = response.toObject();  
        return res.status(200).json({
            status: 'success',
            data: rest,
            success: response ? true : false,
        });
    }
    else
    {
       
        throw new Error('Invalid password');
       
    }  
});


module.exports = { 
    register ,
    login
};