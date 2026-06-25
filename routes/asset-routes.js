const express=require('express');
const router=express.Router();
const upload=require('../middleware/upload-middleware');
const authMiddleware=require('../middleware/auth-middleware');
const {createAsset,getMyAssets}=require('../controllers/asset-controller');
router.post('/create',authMiddleware,upload.single('file'),createAsset);
router.get('/my-assets',authMiddleware,getMyAssets);
module.exports=router;