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
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
