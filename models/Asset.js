const mongoose=require('mongoose')
const AssetSchema=new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    fileSize:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }},
    {
       timestamps:true
    }
);
module.exports=mongoose.model('Asset',AssetSchema)