import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/Spinner";
import Message from "../components/Error";
import { allUsersList, deleteUserFromApp } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
function AllUsersListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.allUsersList);
  const { loading, error, users } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.deleteUser);
  const { success: SuccessDelete } = userDelete;
  useEffect(
    function () {
      if (userInfo && userInfo.isAdmin) dispatch(allUsersList());
      else navigate("/login");
    },
    [navigate, dispatch, SuccessDelete, userInfo]
  );
  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure want to Delete the User '${name}'`))
      dispatch(deleteUserFromApp(id));
  };
  return (
    <div>
      <h1>Users</h1>
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
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id, user.name)}
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
export default AllUsersListScreen;
