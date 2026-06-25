const express=require('express');
const router=express.router();
const authMiddleware=require('../middleware/auth-middleware');
const {createAsset,getMyAssets}=require('../controllers/asset-controller');
router.post('/create',authMiddle)