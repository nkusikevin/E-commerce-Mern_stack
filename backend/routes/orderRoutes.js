import express, { Router } from 'express'
const router = express.Router()
import{addOrderItems,getOrderById,updateOrderToPaid,getOrders, getAllOrders} from '../controllers/orderController.js'
import{admin, Auth} from '../middleWare/aothMiddleWare.js'


router.route('/').post(Auth, addOrderItems)
router.route('/:id/pay').put(Auth,updateOrderToPaid)
router.route("/allOrders").get(Auth, admin, getAllOrders);
router.route('/myorders').get(Auth,getOrders)
router.route("/:id").get(Auth, getOrderById);


export default router