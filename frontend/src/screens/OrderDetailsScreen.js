import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Button, ListGroup, Row, Col, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Error";
import LoadingSpinner from "../components/Spinner";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import { useRazorpay } from "react-razorpay";
import axios from "axios";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERY_RESET,
} from "../constants/orderConstants";
function OrderDetailsScreen() {
  const { Razorpay } = useRazorpay();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDelivery = useSelector((state) => state.orderDelivery);
  const { loading: loadingDeliver, success: successDeliver } = orderDelivery;

  const [button, setButton] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }
  useEffect(
    function () {
      if (!userInfo) navigate("/login");
      if (
        !order ||
        successPay ||
        order._id !== Number(orderId) ||
        successDeliver
      ) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVERY_RESET });
        dispatch(getOrderDetails(orderId));
      } else if (!order.isPaid) {
        setButton(!button);
      }
    },
    [dispatch, order, orderId, successPay, successDeliver]
  );

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const successDeliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  function payNow() {
    razorPayHandler();
  }
  async function razorPayHandler() {
    const paymentobj = {
      amount: parseInt(order.totalPrice) * 100,
      order_id: orderId,
    };
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `https://l-commerce-django-production.up.railway.app/api/orders/create-razorpay-order/${orderId}`,
      paymentobj,
      config
    );

    if (data) {
      if (data.bool === true) {
        var options = {
          key: "rzp_test_oUXbADIa65AnUy",
          amount: parseInt(order.totalPrice) * 100,
          currency: "INR",
          name: "Lokesh Pay",
          description: "Test Transaction",
          image:
            "https://encrypted-tbne-gstatic.com/images?q=tbn:ANd9GcTb3gNCucP2CuVMiqpLt9mHzcT30_ufdiFmg&s",
          order_id: data.id, //This is a sample Order ID. Pass the "id obtained in the response of Step 1
          handler: function (response) {
            successPaymentHandler(response);
          },
          theme: {
            color: "#33399cc",
          },
        };
        var rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert("Payment Failed!!!");
        });
        rzp1.open();
      }
    }
  }
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <p>
                <strong>
                  Email:{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </p>
              <p>
                Details: {order.shippingAddress.address},{""}
                {order.shippingAddress.city}, {order.shippingAddress.postalcode}{" "}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>Payment: {order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">No Orders </Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`https://l-commerce-django-production.up.railway.app${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ width: "50px", height: "50px" }}
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X Rs.{item.price} =Rs.{" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>Rs.{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>Rs.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>Rs.{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>Rs.{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              {/* {button && ( < ListGroup. Item>
<button onClick={payNow}>Pay</button>
</ListGroup. Item>
1} */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <LoadingSpinner />}
                  {/* <button onClick={payNqw}>Pay</button>
                   */}
                  <Button onClick={payNow}>Pay</Button>
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDeliver && <LoadingSpinner />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={successDeliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default OrderDetailsScreen;
