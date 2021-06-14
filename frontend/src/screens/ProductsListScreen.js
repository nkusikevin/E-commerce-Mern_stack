import React ,{useEffect} from 'react'
import{LinkContainer} from "react-router-bootstrap"
import {Table,Button,Row,Col, Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { listProducts, deleteProduct,createProduct } from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constance/productConstance'
function ProductListScreen({history,match}) {
    
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    
    const productDeleted = useSelector(state => state.productDeleted)
    const { loading: proloading, error: proError, success } = productDeleted
    
    const createdProduct = useSelector(state => state.createdProduct)
    const {loading:createloading ,error:createError ,success:createSuccess ,product} = createdProduct

    const dispatch = useDispatch()

    useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})
     if(!userInfo.isAdmin){
       history.push('/login')
     }
    if (createSuccess) {
             history.push(`/admin/product/${product._id}/edit`)
         } else {
            dispatch(listProducts()) 
         }
     
    }, [dispatch, history,userInfo,success,createSuccess,product])

    const deleteHandler = (id) => {
        if (window.confirm("are you sure you want to delete this product?")) {
        dispatch(deleteProduct(id))
    }
    }
    const createProducter = () => {
        dispatch(createProduct())
    }
    return (
        <>
            <Row className="align-items-center">
                <Col className="">
                <h1>Products List</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProducter}>
                        <i className="fas fa-plus">Create Product</i>
                </Button>
                </Col>
            </Row>
            {proloading && <Loader />}
            {proError && <Message variant="danger">{ proError}</Message>}
            {createloading && <Loader />}
            {createError && <Message variant="danger">{ createError}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
            
        </>
    )
}

export default ProductListScreen
