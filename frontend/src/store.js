import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {cartReducer} from './reducers/cartReducer'
import {composeWithDevTools} from "redux-devtools-extension"
import {userLoginReducer} from "./reducers/userReducer"
import {productDetailsReducer, productListReducer} from './reducers/productReducer.js'
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin : userLoginReducer
})
 const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : []
 const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null
const initialState= {
    cart:{cartItems:cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}

const middleWare = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)))

export default store