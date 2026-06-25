const Asset = require('../models/Asset');

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

module.exports = {
    createAsset,
    getMyAssets
};