import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
function CartScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  let params = new URLSearchParams(document.location.search);
  let qty = params.get("qty");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(
    function () {
      if (id) dispatch(addToCart(id, qty));
    },
    [dispatch, id, qty]
  );

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    // navigate("/login?redirect=shipping");
    navigate("/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>{" "}
        {cartItems.length === 0 ? (
          <Error>
            Your cart is empty <Link to="/">Go Back</Link>
          </Error>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="cart-row">
                  <Col md={2} className="cart_product_image">
                    <Image
                      src={`https://l-commerce-django-production.up.railway.app${item.image}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>

                  <Col className="boxs text-center cart_product_name" md={4}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2} className="boxs cart_product_price">
                    Rs.{item.price}
                  </Col>
                  <Col md={2} className="boxs cart_product_qty">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1} className="boxs cart_product_delete">
                    <Button
                      variant="light"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SubTotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                Items
              </h2>
              Rs.
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
export default CartScreen;
