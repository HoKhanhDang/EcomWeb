const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const {SendMail} = require('../ultils/sendMail');
const crypto = require('crypto');
const product = require('../models/product');

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

    const accessToken = generateToken(response._id, response.role);
    const refreshToken = generateRefreshToken(response._id);

    await User.findByIdAndUpdate(response._id, { refreshToken },{new:true});

    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000});

    if (response && await response.matchPassword(password)) {
        const {password,...rest} = response.toObject();  
        return res.status(200).json({
            status: 'success',
            accessToken,
            data: rest,
        });
    }
    else
    {
       
        throw new Error('Invalid password');
       
    }  
});

const getUser = asyncHandler(async (req, res) => {
    const {_id} = req.user;

    const response = await User.findById(_id);

    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });
});

const refreshToken = asyncHandler( async (req,res) => {
    const cookie = req.cookies;
    if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        res.status(400);
        throw new Error('No refresh token');
    }
    // jwt.verify(cookie.refreshToken, process.env.JWT_SECRET,async (err, decoded) => {
    //     if (err) {
    //         res.status(401);
    //         throw new Error('Not authorized, token failed');
    //     }
    //     const user = await User.findOne({_id: decoded._id,refreshToken: cookie.refreshToken});  
    //     return res.status(200).json({
    //         status: 'success',
    //         newAccessToken: generateToken(user._id, user.role),
    //         data: user,
    //     });
    // });

    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

    if (!rs) throw new Error('Not authorized, token failed');

    const response = await User.findOne({_id: rs._id,refreshToken: cookie.refreshToken});
    return res.status(200).json({
        status: 'success',
        newAccessToken: generateToken(response._id, response.role),
        data: response,
    });

})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        res.status(400);
        throw new Error('No refresh token');
    }
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, { refreshToken: null },{new:true});
    res.clearCookie('refreshToken');

    return res.status(200).json({   
        status: 'success',
        message: 'Logged out successfully',
    });

});

const resetPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    const token = await user.createResetPasswordToken(user, res);
    user.save({ validateBeforeSave: false });

    const html = `Click vào link để reset password: <a href="${process.env.URL_SERVER}/api/user/reset-password/${token}">Reset Password</a>`;
    
    const rs = await SendMail(email, html);
    return res.status(200).json({
        status: 'success',
        data: rs,
    });

})

const verifyResetPasswordToken = asyncHandler(async (req, res) => {
    const { password , token } = req.body;
    if (!password || !token) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken: passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        res.status(400);
        throw new Error('Invalid token');
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(200).json({
        status: 'success',
        message: 'Password reset successfully',
    });
})

const getAllUsers = asyncHandler(async (req, res) => {
    const response = await User.find();
    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });

})

const isAdmin = asyncHandler( async(req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
    next();
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    if (!_id) {
        res.status(400);
        throw new Error('ID is required');
    } 
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        res.status(400);
        throw new Error('ID is required');
    } 
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true });
    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });
});

const updateUserByID = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        res.status(400);
        throw new Error('ID is required');
    } 
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true });
    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });
});

const updateAddress = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        res.status(400);
        throw new Error('ID is required');
    } 
    const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, { new: true });
    return res.status(200).json({
        status: 'success',
        data: response,
        success: response ? true : false,
    });
});

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        res.status(400);
        throw new Error('ID is required');
    } 
    const { pid , quantity , color } = req.body;
   
    const user = await User.findById(_id).select('cart');
    const alreadyCart = user?.cart?.find(item => item.product.toString() === pid);
    if (alreadyCart) {
        console.log('already');
        const response = await User.findOneAndUpdate(
            { cart: { $elemMatch: { product: pid } }},
            {
                $set: {
                    "cart.$.quantity": quantity,
                    "cart.$.color": color
                }
            },
            { new: true }
        );
        return res.status(200).json({
            status: 'success',
            data: response,
            success: response ? true : false,
        });
    } 
    else 
    {
        console.log('none');
        console.log(req.body);
        const response = await User.findByIdAndUpdate(_id, {
            $push: {
                cart: {
                    product: pid,
                    quantity: quantity,
                    color: color
                }
            }
        }, { new: true });
        return res.status(200).json({
            status: 'success',
            data: response,
            success: response ? true : false,
        });
    }
    
});


module.exports = { 
    register ,
    login,
    getUser,
    refreshToken,
    logout,
    resetPassword,
    verifyResetPasswordToken,
    getAllUsers,
    isAdmin,
    deleteUser,
    updateUser,
    updateUserByID,
    updateAddress,
    updateCart
};