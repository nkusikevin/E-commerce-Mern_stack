//CART REDUCER
import {CARD_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_PAYMENT_METHOD,CART_SAVE_SHIPPING_ADDRESS,CART_RESET_ITEM} from '../constance/cartConstance'
export const cartReducer = ( state ={ cartItems:[],shippingAddress:{}} ,action) =>    {
switch( action.type){
case CARD_ADD_ITEM :
    const item = action.payload //catching the item that is being added to the cart 

    const existItem = state.cartItems.find(x=> x.product === item.product) //  checking if the added item already exits in the cart

    if(existItem){ //deciding what we should to if the added item exits
        return{
            ...state,
            cartItems:state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
    }else{
        return{
            ...state,
            cartItems: [...state.cartItems, item]
        }
    }
    case CART_REMOVE_ITEM ://remove item from the cart
        return{
            ...state,
            cartItems:state.cartItems.filter((x)=> x.product !== action.payload)
        }
   case CART_SAVE_SHIPPING_ADDRESS:
        return{
            ...state,
            shippingAddress:action.payload
        }
        case CART_SAVE_PAYMENT_METHOD:
        return{
            ...state,
            paymentMethod:action.payload
        }
    case CART_RESET_ITEM:
        return { cartItems: []};
default:
return state
}
}