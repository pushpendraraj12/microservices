const mongoose=require('mongoose')
const Schema =mongoose.Schema;
const userSchema= new Schema({
    user_id:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    phone:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema);
module.exports=User