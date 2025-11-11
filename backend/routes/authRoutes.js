import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const router=express.Router();

router.post("/signup",async(req,res)=>{
  try{
    const {name,email,password}=req.body;
    const exist=await User.findOne({email});
    if(exist) return res.json({msg:"User exists"});
    const hash=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hash});
    res.json({msg:"Signup success",user});
  }catch(e){res.json({msg:e.message});}
});

router.post("/login",async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return res.json({msg:"Invalid"});
    const ok=await bcrypt.compare(password,user.password);
    if(!ok) return res.json({msg:"Invalid"});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.json({msg:"Login success",token,user});
  }catch(e){res.json({msg:e.message});}
});

export default router;