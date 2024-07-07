const Order = require('../models/order');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    if (!_id) return res.status(400).json({ message: "Please provide id" });    

    const { totalPrice, product, status, address, note } = req.body;
    console.log(req.body);
    if (!totalPrice || !product || !status || !address) return res.status(400).json({ message: "Please provide all fields" });

    const deleteCart = await User.findByIdAndUpdate({ _id: _id }, { $set: { cart: [] } });

    const response = await Order.create({
        products: product,
        status,
        totalPrice,
        address,
        note,
        orderedBy: _id,
    });
    
    return res.status(200).json({ 
        message: "Order created successfully", 
        data: response 
    });


});

const changeStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status) return res.status(400).json({ message: "Please provide all fields" });

    const response = await Order.findByIdAndUpdate({ _id: orderId }, { $set: { status } }, { new: true });

    return res.status(200).json({ 
        message: "Order status updated successfully", 
        data: response 
    });

});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    if (!_id) return res.status(400).json({ message: "Please provide all fields" });

    const response = await Order.find({ orderedBy: _id }).populate("products.product", "title price");

    return res.status(200).json({ 
        message: "Orders fetched successfully", 
        data: response 
    });

});


module.exports = { 
    createOrder ,
    changeStatus,
    getOrders
};
