/** @format */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer } from "./reducers/userReducer";
import { userRegisterReducer } from "./reducers/userReducer";
import { userDetailsReducer } from "./reducers/userReducer";
import {
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import { userUpdateProfileReducer } from "./reducers/userReducer";
import {
	productDetailsReducer,
	productListReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productReviewReducer,
} from "./reducers/productReducer.js";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  ordersListReducer,
  listOrdersReducer,
  orderDeliverReducer
} from "./reducers/orderReducer";
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	productDeleted: productDeleteReducer,
	createdProduct: productCreateReducer,
	productUpdate: productUpdateReducer,
	myOrders: ordersListReducer,
	adminOrders: listOrdersReducer,
	userReviews: productReviewReducer,
	orderDelivered: orderDeliverReducer,
});
//storing some state to the local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []; //cart data
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null; //user login data
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}; //user shipping0Address
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;
const initialState = {
  //initial state of the whole app
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];
//creating the store for the app and passing in the inital state and reducer
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;
