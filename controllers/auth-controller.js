const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jsonwebtoken=require('jsonwebtoken');
const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({
                'message':'All fields are required'
            })
        }
        const existingUser= await User.findOne({
            $or:[{email},{username}]
        })
        if(existingUser){
            return res.status(400).json({
                'message':'User already exists'
            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        await User.create({
            username,
            email,
            password:hashedpassword
        })
        res.status(201).json({
            success:true,
            'message':'User registered successfully'
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:'Server Error'}); 
    }
}

const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username||!password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({
                message:'User not found'
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:'Invalid credentials'
            })
        }
        const token=jsonwebtoken.sign({
            id:user._id,
            role:user.role
        },process.env.jsonwebtoken,{
            expiresIn:'1h'
        })
        res.status(200).json({
            success:true,
            token
        } )

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message:'Server error'
        })
    }
}
const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message:'Server error'
        })
    }
}
module.exports={registerUser,loginUser,getProfile} 