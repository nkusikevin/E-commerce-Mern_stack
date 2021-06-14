import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAllOrders } from "../actions/orderActions";
function AllOrderScreen({ history, match }) {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const dispatch = useDispatch();
	const adminOrders = useSelector((state) => state.adminOrders);
	const { loading, orders, error } = adminOrders;
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listAllOrders());
		} else {
			history.push("/login");
		}
	}, [dispatch, history]);

	return (
		<>
			<h1>All Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
                            <th>DETAILS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/orders/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}

export default AllOrderScreen;
