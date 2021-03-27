import React  from 'react'
import {Button,Row,Image,Col,ListGroup,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from "../components/Message"
import CheckoutSteps from '../components/CheckoutSteps'
function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <h1>Place Order</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city},{''}
                            {cart.shippingAddress.postalCode},{''}
                            {cart.shippingAddress.country}
                        </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                             <h2>Order Items</h2>
                             {cart.cartItems.length === 0 ? 
                            <Message>Your cart is empty</Message> :(
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item,index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}x ${item.price}=${item.qty*item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
