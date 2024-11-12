import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingSpinner from "../components/Spinner";
import Error from "../components/Error";
import ProductsCorousel from "../components/ProductsCorousel";
function HomeScreen({ keyword }) {
  const dispatch = useDispatch();
  useEffect(function () {
    // async function fetchProducts) {
    // const { data} = await axios.get("http://127.0.0.1:8000/api/products/");
    // setProducts(data);
    // fetchProducts());
    dispatch(listProducts());
  }, []);
  const productsList = useSelector((state) => state.productsListReducer);
  const { loading, error, products } = productsList;
  return (
    <div>
      <ProductsCorousel />
      <h1>Latest Products</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Row>
          {keyword
            ? products.map((product) =>
                product.name.toLowerCase().includes(keyword.toLowerCase()) ? (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product key={product._id} product={product} />
                  </Col>
                ) : (
                  ""
                )
              )
            : products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product
                    key={product._id}
                    product={product}
                    keyword={keyword}
                  />
                </Col>
              ))}
        </Row>
      )}
    </div>
  );
}
export default HomeScreen;
