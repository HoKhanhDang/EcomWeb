const mongoose = require('mongoose'); // Erase if already required
const { post } = require('../routes/user');

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    brand:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:Array,
    },
    quantity:{
        type:Number,
        default:0,
    },
    totalRating:{
        type:Number,
        default:0,
    },
    rating:[{
        star:{
            type:Number,
            default:0,
        },
        postedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        comment:{
            type:String,
            default:"",
        }
    }],
    sold:{
        type:Number,
        default:0,
    },
    color:[{
        label:{
            type:String
        }       
    }],
    internal:[{
        label:{
            type:String
        }       
    }],

   
});

//Export the model
module.exports = mongoose.model('Product', productSchema);