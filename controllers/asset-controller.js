const Asset = require('../models/Asset');

// Create Asset
const createAsset = async (req, res) => {
    try {

        const { filename, originalName, fileType, fileSize } = req.body;

        if (!filename || !originalName || !fileType || !fileSize) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const asset = await Asset.create({
            filename,
            originalName,
            fileType,
            fileSize,
            owner: req.user.id
        });

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