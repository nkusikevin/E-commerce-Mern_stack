import express from 'express'
import { DeletetProductById, getProductByID, getProducts ,editProductByID, CreateProduct} from "../controllers/productControllers.js"
import  {admin,Auth} from "../middleWare/aothMiddleWare.js"
const router = express.Router()

//@desc Fetch Data
//@route GET /api/products
//@access Public
router.route('/').get(getProducts)
router.route('/createProduct').post(Auth,admin,CreateProduct)
//@desc Fetch Data single product
//@route GET /api/products/:id
//@access Public
router.route('/:id').get(getProductByID).delete(Auth,admin,DeletetProductById).put(Auth,admin,editProductByID)
export default router