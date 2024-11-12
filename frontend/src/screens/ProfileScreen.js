import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../src/actions/userActions";
import Message from "../../src/components/Error";
import { Spinner } from "react-bootstrap";
import { USER_PROFILE_UPDATE_RESET } from "../../src/constants/userConstants";
import { myOrders } from "../actions/orderActions";
import LoadingSpinner from "../components/Spinner";
function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfileUpdateDetails = useSelector(
    (state) => state.userProfileUpdate
  );
  const { success } = userProfileUpdateDetails;
  const myOrdersDetails = useSelector((state) => state.myAllOrders);
  const {
    loading: loadingOrders,
    myorders,
    error: errorInOrder,
  } = myOrdersDetails;
  useEffect(
    function () {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(myOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setMessage("");
      }
    },
    [dispatch, user, userInfo]
  );
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) setMessage("Passwords do not match");
    else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <Row>
      <Col md={3} className="profilescreen_userprofile">
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Spinner />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>{" "}
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>{" "}
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Update{" "}
          </Button>
        </Form>
      </Col>
      <Col md={9} className="profilescreen_myorders">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <LoadingSpinner />
        ) : errorInOrder ? (
          <Message variant="danger">Error in loading your orders</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th> ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {myorders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt} </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}>
                        {""}
                      </i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}
export default ProfileScreen;
