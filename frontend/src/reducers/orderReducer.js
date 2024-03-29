import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_REQUEST,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	LIST_MY_ORDERS_REQUEST,
	LIST_MY_ORDERS_SUCCESS,
	LIST_MY_ORDERS_FAIL,
	LIST_MY_ORDERS_RESET,
	LIST_ALL_ORDERS_REQUEST,
	LIST_ALL_ORDERS_SUCCESS,
	LIST_ALL_ORDERS_FAIL,
	ORDER_DELIVERED_REQUEST,
	ORDER_DELIVERED_SUCCESS,
	ORDER_DELIVERED_FAIL,
	ORDER_DELIVERED_RESET
} from "../constance/orderConstance";
export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			};
		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			};
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

export const ordersListReducer = (state = {orders:[]}, action) => {
	switch (action.type) {
		case LIST_MY_ORDERS_REQUEST:
			return {
				loading: true,
			};
		case LIST_MY_ORDERS_SUCCESS:
			return {
				loading: false,
				orders:action.payload,
			};
		case LIST_MY_ORDERS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LIST_MY_ORDERS_RESET:
			return { orders:[]};
		default:
			return state;
	}
};

export const listOrdersReducer = (state={orders:[]},action)=>{
	switch(action.type){
		case LIST_ALL_ORDERS_REQUEST:
			return{loading:true}
		case LIST_ALL_ORDERS_SUCCESS:
			return{loading:false , orders:action.payload};
		case LIST_ALL_ORDERS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state
	}
}

export const orderDeliverReducer = (state={},action)=>{
	switch (action.payload) {
		case ORDER_DELIVERED_REQUEST:
			return {
				loading: true,
			};
		case ORDER_DELIVERED_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_DELIVERED_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_DELIVERED_RESET:
			return {};
		default:
			return state;
	}
}