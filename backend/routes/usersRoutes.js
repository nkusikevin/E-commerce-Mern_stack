import express from 'express'
const router = express.Router()
import{Auth,admin} from '../middleWare/aothMiddleWare.js'
import {authUser,getUserProfile,registerUser,updateUserProfile, getUsers, DeleteUser,getUser,updateUser} from '../controllers/userController.js'

router.route('/').post(registerUser).get(Auth,admin,getUsers)
router.post("/login",authUser)
router.route("/profile").get(Auth,getUserProfile).put(Auth,updateUserProfile)
router.route("/:id").delete(Auth,admin,DeleteUser).get(Auth,admin,getUser).put(Auth,admin,updateUser)

export default router