const path=require('path');
const fs=require('fs').promises;
const downloadAsset=async(req,res)=>{
    try{
        const assetId=req.params.id;
        const asset=await Asset.findById(assetId);
        if(!asset){
        return res.status(404).json({
            success:false,
            message:'Asset not found'
        })
    }
    if(asset.owner.toString()!==req.user.id && req.user.role!=='admin'){
        return res.status(403).json({
            success:false,
            message:'Unauthorized'
        })  
    }
    const fullpath=path.join(__dirname,'..',asset.filePath);
    res.download(fullpath,asset.originalName);
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            success:false,
            message:'Error occurred while downloading asset'
        })
    }
}