import asyncHandler from "express-async-handler"
import Order from "../models/order.js"
//@desc create new order
//@route POST /api/order
//@access Private
const addOrderItems = asyncHandler(async(req,res)=>{
const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
}= req.body

if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items')
    return
}else{
    const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
}

})
//@desc get order by id
//@route GET /api/order/id
//@access Private
const getOrderById = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id).populate('user','name email')
  
  if(order){
      res.json(order)
  }else{
      res.status(404)
      throw new Error('😢Order not Found')
  }
    
    })
//@desc pay order
//@route GET /api/order/id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id)
  
  if(order){
      order.isPaid = true
      order.PaidAt=Date.now()
      order.paymentResults={
          id:req.body.id,
          status:req.body.status,
          update_time: req.body.update_time,
          email_address:req.body.email_address
      }
      const updateOrder = await order.save()
      res.json(updateOrder)
  }else{
      res.status(404)
      throw new Error('😢Order not Found')
  }
    
    })
export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid
}