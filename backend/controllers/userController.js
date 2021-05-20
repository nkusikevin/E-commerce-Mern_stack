import asyncHandler from "express-async-handler"
// import User from "../models/user.js"
import Users from "../models/user.js"
import generateToken from "../utils/generateToken.js"
//@desc Auth user & get token
//@route Post /api/users/login
//@access Public
const authUser  = asyncHandler(async(req,res)=>{
   const {email,password} = req.body
   const user = await Users.findOne({email})
   if(user && (await user.matchPassword(password))){
    return   res.json({
           _id:user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin ,
           token:generateToken(user._id),
       })
   }else{
       res.status(401)
       throw new Error("invalid email or password")
   }
})
//@desc Register newuser
//@route Post /api/users/register
//@access Public
const registerUser = asyncHandler(async(req,res)=>{
   const {name,email,password} = req.body
   const userExits = await Users.findOne({email})
   if(userExits){
       res.status(400)
       throw new Error('User already exists ')
   }
const user = await Users.create({
           name,
           email,
           password
       })
if(user){
    res.status(201).json({
         _id:user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin ,
           token:generateToken(user._id),
    })
}else{
    res.status(400)
    throw new Error('invalid user data')
}
   
})
//@desc get user profile
//@route Post /api/users/profile
//@access Privet
const getUserProfile  = asyncHandler(async(req,res)=>{
  const user = await Users.findById(req.user._id)
  if(user){
  return  res.status(200).json({
           _id:user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin ,
       })  
  }else{
      res.status(404)
      throw new Error('user not found')
  }
})
//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile  = asyncHandler(async(req,res)=>{
  const user = await Users.findById(req.user._id)
  if(user){
user.name = req.body.name || user.name
user.email = req.body.email || user.email
if(req.body.password){
 user.password = req.body.password   
}
}
const updatedUser = await user.save()
res.json({
      _id:updatedUser._id,
           name:updatedUser.name,
           email:updatedUser.email,
           isAdmin:updatedUser.isAdmin ,
           token:generateToken(updatedUser._id),
})
})
//@desc Get user profile
//@route Get /api/users
//@access Private/Admin
const getUsers  = asyncHandler(async(req,res)=>{
const users = await Users.find({})
res.json(users)
})


//@desc Delete user profile
//@route Delete /api/users
//@access Private/Admin
const DeleteUser  = asyncHandler(async(req,res)=>{
    const user = await Users.findById(req.params.id)
 if(user){
     await user.remove()
     res.json({message:"user removed"})
 }else{
     res.status(404)
     throw new Error("user not found")
 }
    })

//@desc Get userById profile
//@route Get /api/users/:id
//@access Private/Admin
const getUser  = asyncHandler(async(req,res)=>{
    const user = await Users.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error("user not found Mr admin");
    }
    })
//@desc Update user profilee
//@route PUT /api/users/:id
//@access Private Admin
const updateUser  = asyncHandler(async(req,res)=>{
    const user = await Users.findById(req.params.id)
    if(user){
  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  user.isAdmin = req.body.isAdmin
  }
  const updatedUser = await user.save()
  res.json({
        _id:updatedUser._id,
             name:updatedUser.name,
             email:updatedUser.email,
             isAdmin:updatedUser.isAdmin
  })
  })    



export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    DeleteUser,
    getUser,
    updateUser
}