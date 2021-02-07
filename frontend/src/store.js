import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {cartReducer} from './reducers/cartReducer'
import {composeWithDevTools} from "redux-devtools-extension"
import {productDetailsReducer, productListReducer} from './reducers/productReducer.js'
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
})
 const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : []
const initialState= {
    cart:{cartItems:cartItemsFromStorage}
}

const middleWare = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)))

export default store