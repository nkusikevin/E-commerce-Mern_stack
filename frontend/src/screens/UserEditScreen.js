import React ,{useState,useEffect} from 'react'
import{Link} from "react-router-dom"
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import {getUserDetails,UpdateUser} from '../actions/userActions'
import FormContainer from "../components/FormContainer"
import {USER_UPDATE_RESET} from '../constance/userConstance'
function UserEditScreen({match,history}) {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setisAdmin] = useState(false)
    
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:updateLoader ,error:updateError , success} = userUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {

             if(!(user.name) || (user._id !== userId)){
          dispatch(getUserDetails(userId))
      }else{
          setName(user.name)
          setEmail(user.email)
          setisAdmin(user.isAdmin)
      }
            
    }
    }, [dispatch, history, success ,userId, user])
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(UpdateUser({_id:userId, name, email, isAdmin}))
    
    }
    return(
        <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
                <h1>Edit User</h1>
                {updateLoader && <Loader />}
                {updateError && <Message variant="danger">{ updateError }</Message>}
        {loading ? <Loader/> : error ? <Message>{error}</Message> :(
            <Form onSubmit={submitHandler}>
               <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="your Name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
        </Form.Group>
            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="me@email.com" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>
         <Form.Group controlId='isAdmin'>
            <Form.Check type="checkbox" label='Is Admin' checked={isAdmin}  onChange={(e)=> setisAdmin(e.target.checked)}></Form.Check>
        </Form.Group>
        <Button type="submit" variant="success">Update</Button>
        </Form>
        )}
        </FormContainer>
        </>
    )
}

export default UserEditScreen
