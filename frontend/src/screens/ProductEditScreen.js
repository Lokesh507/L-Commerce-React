import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../src/components/FormContainer";
import { listProduct, updateProduct } from "../../src/actions/productActions";

import Message from "../components/Error";
import { Spinner } from "react-bootstrap";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
function ProductEditScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("'");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [uploading, SetUploading] = useState(false);
  const productDetails = useSelector((state) => state.productDetailsReducer);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(
    function () {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        navigate("/admin/products");
      } else {
        if (product) {
          if (!product.name || product._id !== Number(id))
            dispatch(listProduct(id));
          else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setDescription(product.description);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
          }
        }
      }
    },
    [dispatch, product, id, successUpdate]
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        description,
        brand,
        category,
        image,
        countInStock,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("productId", id);
    SetUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "https://l-commerce-django-production.up.railway.app/api/products/uploadimage/",
        formdata,
        config
      );
      setImage(data);
      SetUploading(false);
    } catch (error) {
      SetUploading(true);
    }
  };
  return (
    <div>
      <Link to="/admin/products">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                className="mt-2"
                label="Choose File"
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Spinner />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onchange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-3" type="submit">
              Update{" "}
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}
export default ProductEditScreen;
