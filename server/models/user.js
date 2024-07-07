const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const product = require('./product');
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
        default:'user',
    },
    cart:[
        {
            product:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
            ,
            quantity:{type:Number, default:0},
            color:{type:String, enum:['Black','White','Red','Blue','Green']},
            internal:{type:String, enum:['16GB','32GB','64GB','128GB','256GB']},
        }
              
    ],
    address:{
        type:String,
    },
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
    },
    createResetPasswordToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        return resetToken;
    },
}


//Export the model
module.exports = mongoose.model('User', userSchema);