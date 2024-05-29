const mongoose = require('mongoose'); // Erase if already required
let bcrypt = require('bcryptjs');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    cart:{
        type:Array,
        default:[],
    },
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address'
        }
    ],
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    isBlocked:{
        type:Boolean,
        default:false,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    refreshToken:{
        type:String,
    },
    passwordResetToken:{
        type:String,
    },
    passwordChangedAt:{
        type:String,
    },
    passwordResetExpires:{
        type:String,    
    }

},
{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next;
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods = {
    matchPassword: async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
    }
}


//Export the model
module.exports = mongoose.model('User', userSchema);