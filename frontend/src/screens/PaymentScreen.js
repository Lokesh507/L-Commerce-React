import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
import FormContainer from "../components/FormContainer";
function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentmethod, setPaymentMethod] = useState("RazorPay");
  const submitHandler = (e) => {
    if (!shippingAddress.address) navigate("/shipping");
    dispatch(savePaymentMethod(paymentmethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="Debit Card or UPI or NetBanking or Credit Card"
            id="razorpay"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default PaymentScreen;
