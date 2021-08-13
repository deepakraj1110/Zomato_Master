import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const UserSchema= new mongoose.Schema({
    fullname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String},
    address:[{detail:{type:String},for:{type:String}}], 
    phoneNumber:[{type:Number}],
},{
    timestamps:true,
});

UserSchema.methods.generateJwtToken=function(){
    return jwt.sign({user: this._id.toString()}, "ZomatoAPP");
};

UserSchema.statics.findByEmailAndPhone = async({email,phoneNumber})=>{
    const chechUserByEmail= await UserModel.findOne({email});
    const chechUserByPhone= await UserModel.findOne({phoneNumber});
    
    if(chechUserByEmail || chechUserByPhone){
        throw new Error("User already exists!!!");
    }
    return false;
};

UserSchema.pre("save", function(next){
    const user=this;

    if(!user.isModified("password")) return next();
    // gen salt
    bcrypt.genSalt(8,(error,salt)=>{
        if(error) return next(error);
    // hash password
        bcrypt.hash(user.password,salt,(error,hash)=>{
        if(error) return next(error);
            

        user.password=hash
        return next();
        })
    })
})


export const UserModel = mongoose.model("Users",UserSchema);