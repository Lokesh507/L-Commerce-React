import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import LoadingSpinner from "../components/Spinner";
import Error from "../components/Error";
import { listCorouselProducts } from "../actions/productActions";
function ProductsCorousel() {
  const dispatch = useDispatch();
  const productCorousel = useSelector((state) => state.productCorousel);
  const { loading, error, products } = productCorousel;
  useEffect(
    function () {
      dispatch(listCorouselProducts());
    },
    [dispatch]
  );
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Error variant="danger"> {error}</Error>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={`https://l-commerce-django-production.up.railway.app${product.image}`}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="carousel.caption">
              <h6 style={{ color: "white" }}>
                {product.name} (Rs.{product.price})
              </h6>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default ProductsCorousel;
