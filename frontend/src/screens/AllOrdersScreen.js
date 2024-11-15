import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/Spinner";
import Message from "../components/Error";
import { allOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
function AllOrdersScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.AllOrders);
  const { loading, error, allorders } = ordersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(
    function () {
      if (userInfo && userInfo.isAdmin) dispatch(allOrders());
      else navigate("/login");
    },
    [dispatch, userInfo]
  );
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allorders &&
              allorders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td> {order.user && order.user.name}</td>
                  <td>{order.createdAt}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details{" "}
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AllOrdersScreen;
