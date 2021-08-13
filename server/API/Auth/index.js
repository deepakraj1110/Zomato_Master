import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import {UserModel} from "../../database/user"

const Router = express.Router();

/*
Route     /signup
des       Signup with email and password
params    none
Access    public
Method    POST
 */

Router.post("/signup", async(req,res)=>{
    try{
       await UserModel.findByEmailAndPhone(req.body.credentials);
        
        // save to db
        const newUser=await UserModel.create(req.body.credentials)
        
        // get JWT token
        const token = newUser.generateJwtToken();

        // return
        return res.status(200).json({token,status:"success"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
})


/*
Route     /signin
des       Signuin with email and password
params    none
Access    public
Method    POST
 */

Router.post("/signin", async(req,res)=>{
    try{
      const user= await UserModel.findByEmailAndPassword(req.body.credentials);
        
        // get JWT token
        const token = user.generateJwtToken();

        // return
        return res.status(200).json({token,status:"success"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
})

export default Router;

/*
Route     /signup
des       Signup with emal and password
params    none
Access    public
Method    POST
 */