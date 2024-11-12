import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/Spinner";
import Message from "../components/Error";
import { listProducts } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import { deleteProduct, createProduct } from "../actions/productActions";
import { CREATE_PRODUCT_RESET } from "../constants/productConstants";
function AllProductsScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsListReducer);
  const { loading, error, products } = productsList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(
    function () {
      dispatch({ type: CREATE_PRODUCT_RESET });
      // if (userInfo && userInfo.isAdmin) dispatch(listProducts));
      // else navigate("/login");
      if (!userInfo.isAdmin) navigate("/login");
      if (successCreate) navigate(`/admin/product/${createdProduct._id}/edit`);
      else {
        dispatch(listProducts());
      }
    },
    [dispatch, userInfo, successDelete, successCreate, createdProduct]
  );

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure want to Delete the product '${name}'?`))
      dispatch(deleteProduct(id));
  };
  const createNewProduct = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createNewProduct}>
            <i className="fas fa-plus"></i> Create Product{" "}
          </Button>
        </Col>
      </Row>
      {loadingDelete && <LoadingSpinner />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loadingCreate && <LoadingSpinner />}
      {errorCreate && <Message>{errorCreate}</Message>}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  {" "}
                  <td>{product._id}</td> <td>{product.name}</td>
                  <td>${product.price}</td> <td>{product.category}</td>{" "}
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id, product.name)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default AllProductsScreen;
