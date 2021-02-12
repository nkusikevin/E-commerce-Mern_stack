import express from 'express'
const router = express.Router()
import{Auth} from '../middleWare/aothMiddleWare.js'
import {authUser,getUserProfile,registerUser,updateUserProfile} from '../controllers/userController.js'

router.route('/').post(registerUser)
router.post("/login",authUser)
router.route("/profile").get(Auth,getUserProfile).put(Auth,updateUserProfile)


export default router