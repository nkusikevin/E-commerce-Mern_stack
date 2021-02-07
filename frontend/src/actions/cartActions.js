import axios from 'axios'
import { CARD_ADD_ITEM,CART_REMOVE_ITEM}  from '../constance/cartConstance'
 export const addToCart =( id,qty)=> async(dispatch,getState)=>{
const {data} = await axios.get(`/api/products/${id}`)
dispatch({
    type:CARD_ADD_ITEM,
    payload:{
        product:data._id,
        name:data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty
    }
})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems)) //saving cart in local storage
 }
 export const removeFromCart = (id) => (dispatch,getstate)=>{
     dispatch({
         type:CART_REMOVE_ITEM,
         payload:id,
     })
     localStorage.setItem('cartItems',JSON.stringify(getstate().cart.cartItems))

 }