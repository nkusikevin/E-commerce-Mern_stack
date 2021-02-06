import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from "./screens/Homescreen"
import Products from './screens/productScreen'
import Cart from './screens/CartScreen'
import {BrowserRouter as Router,Route} from 'react-router-dom'
function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3"><Container>
     <Route path='/' component={Home} exact/>
     <Route path='/product/:id' component={Products}/>
     <Route path='/cart/:id?' component={Cart}/>
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
