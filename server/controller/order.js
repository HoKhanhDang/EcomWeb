const Order = require('../models/order');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    if (!_id) return res.status(400).json({ message: "Please provide all fields" });    

    const { paymentMethod } = req.body;
    if ( !paymentMethod) return res.status(400).json({ message: "Please provide all fields" });

    let totalPrice = 0;

    const cart = await User.findOne({ _id: _id }).select("cart").populate("cart.product", "title price");
    console.log('cart',cart);
    if (!cart) return res.status(400).json({ message: "No cart found" });

    totalPrice=  cart.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (req.body.coupon) {
        const couponData = await Coupon.findById({ _id: req.body.coupon });
        if (!couponData) return res.status(400).json({ message: "Coupon not found" });

        totalPrice = totalPrice - totalPrice * couponData.discount / 100;
    }

    const deleteCart = await User.findByIdAndUpdate({ _id: _id }, { $set: { cart: [] } });


    const response = await Order.create({
        products: cart.cart,
        totalPrice,
        paymentMethod,
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
