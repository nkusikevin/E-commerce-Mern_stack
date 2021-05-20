import express, { Router } from 'express'
const router = express.Router()
import{addOrderItems,getOrderById,updateOrderToPaid} from '../controllers/orderController.js'
import{Auth} from '../middleWare/aothMiddleWare.js'


router.route('/').post(Auth, addOrderItems)
router.route('/:id').get(Auth, getOrderById)
router.route('/:id/pay').put(Auth,updateOrderToPaid)

export default router