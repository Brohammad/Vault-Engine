const express= require('express');
require('dotenv').config();
const port=process.env.PORT || 3000;
const connectDB=require('./config/db');
const authRoutes=require('./routes/auth-routes')
const adminRoutes=require('./routes/admin-routes')
const assetRoutes=require('./routes/asset-routes')
const app=express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assets', assetRoutes);
connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})