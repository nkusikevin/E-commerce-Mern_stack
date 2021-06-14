import jwt from "jsonwebtoken"
import User from "../models/user.js"
import asyncHandler from "express-async-handler"

const Auth = asyncHandler(async( req,res,next)=>{
let token
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error);
        res.status(401)
        throw new Error('Not authorized , token Failed')
    }
}else if(!token){
    res.status(401)
    throw new Error('Not authorized')
}
})

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Not Authorized for the Route")
    }
}
export{
    Auth,
    admin
}