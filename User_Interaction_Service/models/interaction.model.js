const mongoose=require('mongoose')
const Schema =mongoose.Schema;
const interactionSchema= new Schema({
    content_id:{
    type:String,
    unique:true,
    },
    reads:{
        type:Number,
    },
    likes:{
        type:Number,
    }
},{timestamps:true})

const Interaction=mongoose.model('Interaction',interactionSchema);
module.exports=Interaction