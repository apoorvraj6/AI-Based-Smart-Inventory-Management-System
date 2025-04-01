import { User } from "../models/user";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {ApiError} from '../utils/apiError.js'
import jwt from 'jsonwebtoken'


const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {

        const token = req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            throw new ApiError(401,"Unauthorized Access");
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        

        if(!decodedToken){
            throw new ApiError(401,"Invalid access Token");
        }

        req.user = decodedToken;
        next();

    } catch (error) {
        return next(new ApiError(401,error?.message || "Unauthorized Access"));
    }
})

const adminOnly = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return new ApiError(403).json({message:"Admin Only"});
    }
    next();
}

export {adminOnly,verifyJWT};