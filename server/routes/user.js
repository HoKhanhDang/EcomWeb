const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const { register ,login , getUser, refreshToken,logout ,resetPassword ,
    verifyResetPasswordToken , getAllUsers,isAdmin,deleteUser,
    updateUser,updateUserByID,updateAddress ,updateCart ,finalRegister,deleteCart,
    updateQuantity

} = require('../controller/user');

router.post('/register', register)
router.get('/finalRegister/:registerToken', finalRegister)

router.post('/login', login)
router.get('/getUser',verifyToken , getUser)
router.post('/refreshToken', refreshToken)
router.get('/logout', logout) 
router.post('/resetPassword', resetPassword)
router.post('/verifyResetPassword', verifyResetPasswordToken)
router.get('/getAllUsers', [verifyToken,isAdmin] , getAllUsers)
router.delete('/deleteUser/:_id', [verifyToken,isAdmin] , deleteUser)
router.put('/updateUser', verifyToken , updateUser)
router.put('/updateUserByID/:_id', [verifyToken,isAdmin] , updateUserByID)
router.put('/updateAddress/:_id' , updateAddress)
router.put('/updateCart',verifyToken, updateCart)
router.put('/deleteCart/:pid', verifyToken , deleteCart)
router.put('/updateQuantity', verifyToken , updateQuantity)


module.exports = router;