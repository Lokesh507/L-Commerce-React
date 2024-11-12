import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_RESET,
  MY_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
  ORDER_DELIVERY_FAIL,
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_SUCCESS,
  ORDER_DELIVERY_RESET,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { ...state, error: action.payload, success: false };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERY_REQUEST:
      return { loading: true };
    case ORDER_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { myorders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { loading: true };
    case MY_ORDERS_SUCCESS:
      return { loading: false, myorders: action.payload };
    case MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case MY_ORDERS_RESET:
      return { myorders: [] };
    default:
      return state;
  }
};

export const AllOrderReducer = (state = { allorders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return { loading: true };
    case ALL_ORDERS_SUCCESS:
      return { loading: false, allorders: action.payload };
    case ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
