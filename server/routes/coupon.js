const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const {
    addCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
} =  require('../controller/coupon');

router.post('/add', addCoupon);
router.get('/getCoupons', getCoupons);
router.put('/getCoupon/:name', getCoupon);
router.put('/update/:cid', updateCoupon);
router.delete('/delete/:name', deleteCoupon);

module.exports = router;