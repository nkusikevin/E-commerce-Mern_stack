import asyncHandler from "express-async-handler"
import Products from "../models/products.js"
//@desc Fetch Data
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async(req,res)=>{
      const products = await Products.find({})
  res.json(products)
})
//@desc Fetch Data single product
//@route GET /api/products/:id
//@access Public
const getProductByID = asyncHandler(async(req,res)=>{
  const product = await Products.findById(req.params.id)

  if(product){
    res.json(product)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc Delete single product
//@route Delete /api/products/:id
//@access Private/admin
const DeletetProductById = asyncHandler(async(req,res)=>{
  const product = await Products.findById(req.params.id)

  if(product){
    await product.remove()
    res.json({message:"product remove"})
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc create single product
//@route Post /api/products/createPoduct
//@access Private/admin
const CreateProduct = asyncHandler(async(req,res)=>{
  const product = new Products({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description:"sample description"
  })

  const createdproduct = await product.save();
  res.status(201).json(createdproduct)
})

//@desc Edit single product
//@route put /api/product/:id
//@access Private/admin
const editProductByID = asyncHandler(async (req, res) => {
  const { name, price, image, countInStock, description, brand, category } = req.body
  
  const product = await Products.findById(req.params.id)

  if (product) {
    product.name=name
    product.price=price
    product.description=description
    product.image= image
    product.brand = brand
    product.countInStock=countInStock
    product.category = category

    const updatedproduct = await product.save()
    res.status(201).json(updatedproduct)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
})
export {
    getProductByID,
  getProducts,
  DeletetProductById,
  CreateProduct,
  editProductByID
}