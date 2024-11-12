import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

import Rating from "../components/Rating";
import LoadingSpinner from "../components/Spinner";
import Error from "../components/Error";
import { listProduct, createproductReview } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PRODUCT_REVIEW_RESET } from "../constants/productConstants";
function ProductScreen() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  const productList = useSelector((state) => state.productDetailsReducer);
  const { product, loading, error } = productList;
  const createProductReview = useSelector((state) => state.createProductReview);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = createProductReview;
  useEffect(
    function () {
      // async function fetchProductid) f
      // / const { data } = await axios.get(`/api/products/${id}`);
      //
      // setProduct (data);
      // }
      // fetchProduct (id);
      if (successProductReview) {
        setComment("");
        setRating(0);
        dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
      }
      dispatch(listProduct(id));
    },
    [dispatch, id, successProductReview]
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitReviews = (e) => {
    e.preventDefault();
    dispatch(
      createproductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <div>
          <Link to="/" className="btn btn-light my-3">
            GO Back{" "}
          </Link>
          <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3> {product.name}</h3>
                  </ListGroup.Item>{" "}
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
                  <ListGroup.Item style={{ textAlign: "justify" }}>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>Rs.{product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Stock:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty:</Col>
                          <Col xs="auto" className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}{" "}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        onClick={addToCart}
                        className="btn btn-block"
                        type="button"
                        disabled={product.countInStock > 0 ? false : true}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews ? (
                  product.reviews.length === 0 ? (
                    <Error variant="info">No Reviews</Error>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <ListGroup variant="flush">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        {" "}
                        <strong> {review.name}</strong>
                        <Rating value={review.rating} color="#f8e825" />
                        <p>{review.createdAt} </p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  <ListGroup.Item>
                    <h4>Write a review</h4>
                    {errorProductReview && (
                      <Error variant="danger">{errorProductReview}</Error>
                    )}
                    {successProductReview && (
                      <Error variant="success">Review Submitted</Error>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitReviews}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                          className="mt-1"
                        >
                          Submit Review
                        </Button>
                      </Form>
                    ) : (
                      <Error variant="info">
                        Please <Link to="/login">Login</Link> to write a review.
                      </Error>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductScreen;
