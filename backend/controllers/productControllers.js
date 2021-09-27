import asyncHandler from "express-async-handler";
import Products from "../models/products.js";
//@desc Fetch Data
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10	;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};
	const count = await Products.countDocuments({ ...keyword });
	const products = await Products.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
//@desc Fetch Data single product
//@route GET /api/products/:id
//@access Public
const getProductByID = asyncHandler(async (req, res) => {
	const product = await Products.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//@desc Delete single product
//@route Delete /api/products/:id
//@access Private/admin
const DeletetProductById = asyncHandler(async (req, res) => {
	const product = await Products.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: "product remove" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//@desc create single product
//@route Post /api/products/createPoduct
//@access Private/admin
const CreateProduct = asyncHandler(async (req, res) => {
	const product = new Products({
		name: "sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "sample brand",
		category: "sample category",
		countInStock: 0,
		numReviews: 0,
		description: "sample description",
	});

	const createdproduct = await product.save();
	res.status(201).json(createdproduct);
});

//@desc Edit single product
//@route put /api/product/:id
//@access Private/admin
const editProductByID = asyncHandler(async (req, res) => {
	const { name, price, image, countInStock, description, brand, category } =
		req.body;

	const product = await Products.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.countInStock = countInStock;
		product.category = category;

		const updatedproduct = await product.save();
		res.status(201).json(updatedproduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//@desc Create New Review
//@route post /api/product/:id/reviews
//@access Private
const productReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Products.findById(req.params.id);
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewed) {
			res.status(404);
			throw new Error("product already reviewed");
		} else {
			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			};
			product.reviews.push(review);
			product.numReviews = product.reviews.length;
			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;

			await product.save();
			res.status(201).json({ message: "Review Added" });
		}
	} else {
		req.status(404);
		throw new Error("no review");
	}
});
export {
	getProductByID,
	getProducts,
	DeletetProductById,
	CreateProduct,
	editProductByID,
	productReview,
};
