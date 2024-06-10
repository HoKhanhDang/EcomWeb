const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products:[{
        product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
        quantity:{type:Number, required:true},
        color:{type:String},
    }],
    status:{
        type:String,
        default:'Not processed',
        enum:['Not processed','Processing','Shipped','Delivered','Cancelled'],
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    coupon:{
        type:mongoose.Schema.Types.ObjectId, ref:'Coupon',
    },
    paymentMethod:{
        type:String,
    },
    orderedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    
    
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);