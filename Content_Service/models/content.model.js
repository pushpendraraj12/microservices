const mongoose=require('mongoose')
const Schema =mongoose.Schema;
const contentSchema= new Schema({
    content_id:{
    type:String,
    unique:true,
    },
    user_id:{
        type:String,
    },
    title:{
        type:String,
    },
    story:{
        type:String,
    },
    date_published:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

const Content=mongoose.model('Content',contentSchema);
module.exports=Content