const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
    },
    image:{
        type:String,
        default: 'https://via.placeholder.com/150',
    },

    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    dislikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);