import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	LIST_MY_ORDERS_REQUEST,
	LIST_MY_ORDERS_SUCCESS,
	LIST_MY_ORDERS_FAIL,
	LIST_ALL_ORDERS_REQUEST,
	LIST_ALL_ORDERS_SUCCESS,
	LIST_ALL_ORDERS_FAIL,
	ORDER_DELIVERED_REQUEST,
	ORDER_DELIVERED_SUCCESS,
	ORDER_DELIVERED_FAIL
} from "../constance/orderConstance";
import axios from "axios";
import { CART_RESET_ITEM } from "../constance/cartConstance";
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/orders`, order, config);
		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/${id}`, config);
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_PAY_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			);
			dispatch({
				type: ORDER_PAY_SUCCESS,
				payload: data,
			});
			dispatch({ type: CART_RESET_ITEM });
		} catch (error) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LIST_MY_ORDERS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/myorders`, config);
		dispatch({
			type: LIST_MY_ORDERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: LIST_MY_ORDERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LIST_ALL_ORDERS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/allOrders`, config);
		dispatch({ type: LIST_ALL_ORDERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: LIST_ALL_ORDERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deliverOrders = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELIVERED_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(
			`/api/orders/${order._id}/delivered`,{},
			config
		);
		dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DELIVERED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
