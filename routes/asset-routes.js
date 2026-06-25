const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/auth-middleware');
const {createAsset,getMyAssets}=require('../controllers/asset-controller');
router.post('/create',authMiddleware,createAsset);
router.get('/my-assets',authMiddleware,getMyAssets);
module.exports=router;