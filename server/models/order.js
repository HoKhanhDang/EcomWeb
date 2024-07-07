const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: { type: Number, default: 0 },
            color: {
                type: String,
    
            },
            internal: {
                type: String         
            },
        },
    ],
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Cancelled", "Success"],
    },
    totalPrice: {
        type: Number,
    },
    address: {
        type: String,
    },
    note: {
        type: String,
    },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
