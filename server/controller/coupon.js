const Coupon = require('../models/coupon');

const asyncHandler = require('express-async-handler');

const addCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) return res.status(400).json({ message: "Please provide all fields" });

    const coupon = await Coupon.create({
        ...req.body,
        expiry: Date.now() + expiry * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
        status: 'success',
        res: coupon,
    });


});

const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();
    return res.status(200).json({
        status: 'success',
        res: coupons,
    });
});

const getCoupon = asyncHandler(async (req, res) => {
    const {name} = req.params;
    if(!name) return res.status(400).json({ message: "Please provide coupon name" });   

    const coupon = await Coupon.findOne({name});
    return res.status(200).json({
        status: 'success',
        res: coupon,
    });
});


const updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) return res.status(400).json({ message: "Please provide all fields" });

    const coupon = await Coupon.findByIdAndUpdate(cid, {
        ...req.body,
        expiry: Date.now() + expiry * 24 * 60 * 60 * 1000,
    }, { new: true });

    return res.status(200).json({
        status: 'success',
        res: coupon,
    });
}
);

const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.name);
    return res.status(200).json({
        status: 'success',
        res: coupon,
    });
});
module.exports = {
    addCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
};