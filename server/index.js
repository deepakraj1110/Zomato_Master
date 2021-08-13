// env varibles

require("dotenv").config();

// lib
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./database/connection";

//microservices
import Auth from "./API/Auth";

const zomato=express();

// application middeleware
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

//applicaton routes
zomato.use("/auth",Auth);


zomato.get("/",(req,res)=>res.json({message:"succesfull"}));

zomato.listen(5000,()=>connectDB().then(()=>console.log("server is fine")).catch(()=>
console.log("server is fine, but database connection is failed")));