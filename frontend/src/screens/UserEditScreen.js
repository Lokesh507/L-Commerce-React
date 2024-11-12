import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../src/components/FormContainer";
import {
  getUserDetailsByAdmin,
  updateUserProfileByAdmin,
} from "../../src/actions/userActions";
import Message from "../../src/components/Error";
import { Spinner } from "react-bootstrap";
import { USER_PROFILE_UPDATEBYADMIN_RESET } from "../constants/userConstants";
function UserEditScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userProfileUpdateByAdmin = useSelector(
    (state) => state.userProfileUpdateByAdmin
  );
  const { success: successUpdate } = userProfileUpdateByAdmin;
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (successUpdate) {
        dispatch({ type: USER_PROFILE_UPDATEBYADMIN_RESET });
        navigate("/admin/users/");
      } else {
        if (!user.name || user._id !== Number(id))
          dispatch(getUserDetailsByAdmin(id));
        else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      }
    },
    [dispatch, user, successUpdate, id]
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfileByAdmin(user._id, {
        name: name,
        email: email,
        isAdmin: isAdmin,
      })
    );
  };
  return (
    <div>
      <Link to="/admin/users">Go Back</Link>
      <FormContainer>
        <h1>Update User</h1>
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
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}
export default UserEditScreen;
