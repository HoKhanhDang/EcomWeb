const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const {
    createOrder ,
    changeStatus,
    getOrders
} =  require('../controller/order');

router.post('/create',verifyToken, createOrder);
router.put('/status/:orderId',verifyToken, changeStatus);
router.get('/get',verifyToken, getOrders);
module.exports = router;