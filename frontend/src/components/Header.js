import React from 'react'
import {Route} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar,Nav, NavDropdown } from 'react-bootstrap'
import {logout} from '../actions/userActions'
import SearchBar from './SearchBar'
const Header = () => {
const dispatch = useDispatch()
const userLogin = useSelector(state => state.userLogin)
const {userInfo} = userLogin
const logoutHandler =()=>{
dispatch(logout())
}
    return (
       <header>
           <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               <LinkContainer to='/'>
  <Navbar.Brand >Endline shop</Navbar.Brand>
               </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Route render={({history})=><SearchBar history={history}/>}/>
    <Nav className="ml-auto">
        <LinkContainer to='/cart'>
      <Nav.Link ><i className="fas fa-shopping-cart"/>Cart</Nav.Link>
        </LinkContainer>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username">
            <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        ):  <LinkContainer to ='/login'>
      <Nav.Link ><i className="fas fa-user"/>Sign In</Nav.Link>
        </LinkContainer>
        }
{userInfo && userInfo.isAdmin &&(
     <NavDropdown title='ADMIN' id="AdminMenu">
     <LinkContainer to='/admin/userList'>
       <NavDropdown.Item>Users</NavDropdown.Item>
     </LinkContainer>
     <LinkContainer to='/admin/productList'>
       <NavDropdown.Item>Products</NavDropdown.Item>
     </LinkContainer>
     <LinkContainer to='/admin/orderList'>
       <NavDropdown.Item>Orders</NavDropdown.Item>
     </LinkContainer>
   </NavDropdown>
)}  
    </Nav>

  </Navbar.Collapse>
</Navbar>
       </header>
    )
}

export default Header
