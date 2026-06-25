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
        type:Sting,
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
modules.exports=mongoose.model('Asset',AssetSchema)