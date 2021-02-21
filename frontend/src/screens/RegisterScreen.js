import React ,{useState,useEffect} from 'react'
import{Link} from "react-router-dom"
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import {register} from '../actions/userActions'
import FormContainer from "../components/FormContainer"
function RegisterScreen({location,history}) {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [message, setMessage] = useState(null) 
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])
    const submitHandler = (e)=>{
        e.preventDefault()
    if(password !== confirmpassword){
        setMessage('Password do not match')
    }else{
        dispatch(register(name,email,password))
    }
    }
    return <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
               <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="your Name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
        </Form.Group>
            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="me@email.com" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Your Password" value={password} onChange={(e)=> setpassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e)=> setConfirmpassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Register</Button>
        </Form>
        <Row className="py-3">
            <Col>
          Have an Account ?{''}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Log in
            </Link>
            </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen
