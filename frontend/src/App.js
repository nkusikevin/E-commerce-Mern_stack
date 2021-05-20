import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from "./screens/Homescreen"
import Products from './screens/productScreen'
import Cart from './screens/CartScreen'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from "./screens/RegisterScreen"
import Profile from './screens/ProfileScreen'
import Shipping from "./screens/ShippingScreen"
import payment from './screens/PaymentScreen'
import PlaceOrder from './screens/PlaceOrderScreen'
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductsListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3"><Container>
     <Route path='/' component={Home} exact/>
     <Route path='/login' component={LoginScreen}/>
     <Route path='/register' component={RegisterScreen}/>
     <Route path="/profile" component={Profile}/>
     <Route path='/product/:id' component={Products}/>
     <Route path='/cart/:id?' component={Cart}/>
      <Route path='/shipping' component={Shipping}/>
      <Route path='/payment' component={payment}/>
      <Route path='/placeorder' component={PlaceOrder}/>
      <Route path='/order/:id' component={OrderScreen}/>
      <Route path='/admin/userList' component={UserListScreen}/>
      <Route path="/admin/user/:id/edit" component={UserEditScreen} />
      <Route path="/admin/productList" component={ProductListScreen}/>
      <Route path="/admin/product/:id/edit" component={ProductEditScreen}/>
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
