import mongoose from "mongoose";
import User from '../models/User.js'
import bcrypt from "bcryptjs"
import { createError } from "../Error.js";
import jwt from "jsonwebtoken";

export const signup = async(req, res,next) => {

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt); 
    const user = new User ({...req.body,password:hash});
    const newUser = await user.save()
    res.status(200).send("User has been created successfully")
  } catch (err){
    next(err)
  }
};
export const signin = async(req, res,next) => {
  try {
  const user = await User.findOne({name:req.body.name})
   if (!user) return next(createError(404, "User not found!"));
   const isCorrect = await bcrypt.compare(req.body.password,user.password)
   if(!isCorrect) return next(createError(400, "Worng Credentials!"));
   const token = jwt.sign({ id: user._id }, process.env.JWT,{expiresIn:"1D"});
const { password, ...others } = user._doc;

   res
   .cookie("token",token,{
    httpOnly:true
   })
   .status(200).json({...others,token});
  } catch (err){
    next(err)
  }
};
export const googleAuth =async(req,res,next)=>{
try {
  const user = await User.findOne({email:req.body.email});
  if(user){
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "1D",
      });
      res
      .cookie("token",token,{
        httpOnly: true
      })
      .status(200).json({...user._doc,token})
  }else{
    const newUser = new User({...req.body,fromGoogle: true})
    const savedUser = await newUser.save()
     const token = jwt.sign({ id: savedUser._id }, process.env.JWT, {
       expiresIn: "1D",
     });
     res
       .cookie("token", token, {
         httpOnly: true,
       })
       .status(200)
       .json({...savedUser._doc,token});
  }
} catch (err) {
  next(err)
}
}