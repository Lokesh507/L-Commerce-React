import React from "react";
import { Form } from "react-bootstrap";
function SearchBox({ setKeyword }) {
  return (
    <Form
      style={{
        height: "40px",
        width: "250px",
        borderRadius: "10px",
        marginLeft: "auto",
        display: "inline-flex",
      }}
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
        style={{ borderRadius: "7px" }}
      ></Form.Control>
    </Form>
  );
}
export default SearchBox;
