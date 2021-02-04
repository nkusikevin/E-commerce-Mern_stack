import express from 'express'
import asyncHandler from "express-async-handler"
const router = express.Router()
import Products from "../models/products.js"
//@desc Fetch Data
//@route GET /api/products
//@access Public
router.get('/',asyncHandler( async(req,res)=>{
  const products = await Products.find({})
  res.json(products)
}))
//@desc Fetch Data single product
//@route GET /api/products/:id
//@access Public
router.get('/:id', asyncHandler(async(req,res)=>{
  const product = await Products.findById(req.params.id)

  if(product){
    res.json(product)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
})

)

export default router