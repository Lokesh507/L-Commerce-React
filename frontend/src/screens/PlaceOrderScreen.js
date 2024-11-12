import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, Row, Col, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Error";
import { createOrder } from "../actions/orderActions";
import { CREATE_ORDER_RESET } from "../constants/orderConstants";
function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = Number((0.082 * cart.itemsPrice).toFixed(2)); //8.2% tax
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  useEffect(function () {
    if (!cart.paymentMethod) navigate("/payment");
  }, []);
  useEffect(function () {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  });
  const placeorder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              <h2>Shipping</h2>
              <p>
                Details: {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalcode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>Payment: {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Cart Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">No Items in cart</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                          {item.qty} X Rs.{item.price} =Rs.
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
                  <Col>Item: </Col>
                  <Col>Rs.{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>Rs.{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>Rs.{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>Rs.{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeorder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default PlaceOrderScreen;
