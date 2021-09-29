import React,{useEffect} from 'react'

import { Row,Col} from 'react-bootstrap'
import Loader from "../components/Loader"
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from "../components/Paginate"
import ProductSlider from "../components/ProductSlider";
import Meta from "../components/Meta"
import {useDispatch,useSelector} from "react-redux"
import {listProducts} from '../actions/productActions'
import { Link } from 'react-router-dom'
function Homescreen({match}) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const ProductList = useSelector(state => state.productList)
    const {loading , error ,products ,page ,pages} = ProductList
     const dispatch = useDispatch()
    useEffect(() => {
			dispatch(listProducts(keyword,pageNumber));
		}, [dispatch, keyword, pageNumber]);
    return (
			<>
			<Meta/>
			{!keyword ? (<ProductSlider/>) :(<Link to='/' className="btn btn-light">Go Back</Link>) }
				<h1>Latest Products</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<>
						<Row>
							{products.map((product) => (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Product product={product} />
								</Col>
							))}
						</Row>
						<Paginate
							pages={pages}
							page={page}
							keyword={keyword ? keyword : ''}
						/>
					</>
				)}
			</>
		);
}

export default Homescreen
