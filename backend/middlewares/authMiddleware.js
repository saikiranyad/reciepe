const express = require('express');
const jwt = require('jsonwebtoken')


const authmiddleware = async(req,res,next)=>{
    try{
   

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(403).json({success:false,message:"un authorized token"})
        }
        jwt.verify(token,"SAIKIRAN",(err,decoded)=>{
            if(err){
                return res.status(409).json({success:false,message:"invalid token"})
            }
            req.user = decoded;
            next();
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"auth middle ware api error"})
    }
}

module.exports = {authmiddleware}