import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  createProductReviewReducer,
  productCorouselReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersReducer,
  AllOrderReducer,
  orderDeliveryReducer,
} from "./reducers/orderReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  allUsersListReducer,
  deleteUserReducer,
  userProfileUpdateByAdminReducer,
} from "./reducers/userLoginReducer";
const reducer = combineReducers({
  productsListReducer: productsReducer,
  productDetailsReducer: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myAllOrders: myOrdersReducer,
  allUsersList: allUsersListReducer,
  deleteUser: deleteUserReducer,
  userProfileUpdateByAdmin: userProfileUpdateByAdminReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  AllOrders: AllOrderReducer,
  orderDelivery: orderDeliveryReducer,
  createProductReview: createProductReviewReducer,
  productCorousel: productCorouselReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
