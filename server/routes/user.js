const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const { register ,login , getUser, refreshToken,logout ,resetPassword ,
    verifyResetPasswordToken , getAllUsers,isAdmin,deleteUser,
    updateUser,updateUserByID,updateAddress ,updateCart 

} = require('../controller/user');

router.post('/register', register)
router.post('/login', login)
router.get('/getUser',verifyToken , getUser)
router.post('/refreshToken', refreshToken)
router.get('/logout', logout) 
router.get('/resetPassword', resetPassword)
router.put('/resetPassword', verifyResetPasswordToken)
router.get('/getAllUsers', [verifyToken,isAdmin] , getAllUsers)
router.delete('/deleteUser/:_id', [verifyToken,isAdmin] , deleteUser)
router.put('/updateUser', verifyToken , updateUser)
router.put('/updateUserByID/:_id', [verifyToken,isAdmin] , updateUserByID)
router.put('/updateAddress/:_id' , updateAddress)
router.put('/updateCart/:_id', updateCart)

module.exports = router;