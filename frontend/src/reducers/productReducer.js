import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_RESET,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  PRODUCT_COROUSEL_FAIL,
  PRODUCT_COROUSEL_REQUEST,
  PRODUCT_COROUSEL_SUCCESS,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, products: [], loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case PRODUCT_LIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        Loading: false,
        success: true,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { ...state, loading: true };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CREATE_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productCorouselReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_COROUSEL_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_COROUSEL_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_COROUSEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
