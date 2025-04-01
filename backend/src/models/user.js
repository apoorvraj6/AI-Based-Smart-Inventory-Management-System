import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","manager","staff"],
        default:"staff",
    },
    refreshToken:{
        type:String,
    }

},{timeStamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();

    this.passowrd = await bcrypt.hash(this,this.passowrd,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(this.password,password);
}



export const User = mongoose.model('User',userSchema);