import express from 'express'
import {getProductByID,getProducts} from "../controllers/productControllers.js"
const router = express.Router()

//@desc Fetch Data
//@route GET /api/products
//@access Public
router.route('/').get(getProducts)
//@desc Fetch Data single product
//@route GET /api/products/:id
//@access Public
router.route('/:id').get(getProductByID)
export default router