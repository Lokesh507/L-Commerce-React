import React from "react";
import { Alert } from "react-bootstrap";
function Error({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default Error;
