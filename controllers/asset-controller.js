const Asset = require('../models/Asset');
const fs = require('fs').promises;
const path=require('path');
// Create Asset
const createAsset = async (req, res) => {
    try {

        if(!req.file)
            return res.status(400).json({
                success: false,
                message:"Please upload a file"
        })
        const asset=await Asset.create({
            filename:req.file.filename,
            originalName:req.file.originalname,
            fileType:req.file.mimetype,
            fileSize:req.file.size,
            filePath:req.file.path,
            owner:req.user.id
        })
        console.log(asset);
        res.status(201).json({
            success: true,
            message: "Asset created successfully",
            asset
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Get Logged-in User Assets
const getMyAssets = async (req, res) => {

    try {

        const assets = await Asset.find({
            owner: req.user.id
        });

        res.status(200).json({
            success: true,
            count: assets.length,
            assets
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const deleteAsset=async(req,res)=>{
    try
    {const assetId=req.params.id;
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
    const fullPath=path.join(__dirname,'..',asset.filePath);
    // Delete the file from the filesystem
    await fs.unlink(fullPath);
    await asset.deleteOne();
    
    
    res.status(200).json({
        message:'Asset deleted successufully'
    })
    
}
    catch(e){
        console.error(e);
        res.status(500).json({
            success:false,
            message:'Server Error'
        })
    }
}

module.exports = {
    createAsset,
    getMyAssets,
    deleteAsset
};