const express=require('express');
const router=express.Router();
const upload=require('../middleware/upload-middleware');
const authMiddleware=require('../middleware/auth-middleware');
const {createAsset,getMyAssets,deleteAsset}=require('../controllers/asset-controller');
router.post('/create',authMiddleware,upload.single('file'),createAsset);
router.get('/my-assets',authMiddleware,getMyAssets);
router.delete('/:id',authMiddleware,deleteAsset);
router.get('/download/:id',authMiddleware,)
module.exports=router