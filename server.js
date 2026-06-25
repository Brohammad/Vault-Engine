const express= require('express');
const path=require('path');
require('dotenv').config();
const port=process.env.PORT || 3000;
const connectDB=require('./config/db');
const authRoutes=require('./routes/auth-routes')
const adminRoutes=require('./routes/admin-routes')
const assetRoutes=require('./routes/asset-routes')
const app=express();
connectDB();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assets', assetRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})