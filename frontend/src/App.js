import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import AllUsersListScreen from "./screens/AllUsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import AllOrdersScreen from "./screens/AllOrdersScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <Router>
      <Header setKeyword={setKeyword} />
      <main className="py-3">
        <Container>
          <Routes>
            {/* <Route Component={HomeScreen) path="/" /> */}
            <Route element={<HomeScreen keyword={keyword} />} path="/" />
            <Route Component={LoginScreen} path="/login" />
            <Route Component={RegisterScreen} path="/register" />
            <Route Component={ProfileScreen} path="/profile" />
            <Route Component={ProductScreen} path="/product/:id" />
            <Route Component={CartScreen} path="/cart/:id?" />
            <Route Component={ShippingScreen} path="/shipping" />
            <Route Component={PaymentScreen} path="/payment" />
            <Route Component={PlaceOrderScreen} path="/placeorder" />
            <Route Component={OrderDetailsScreen} path="/order/:orderId" />
            <Route Component={AllUsersListScreen} path="/admin/users" />
            <Route Component={UserEditScreen} path="/admin/user/:id/edit" />
            <Route Component={AllProductsScreen} path="/admin/products" />
            <Route Component={AllOrdersScreen} path="/admin/orders" />
            <Route
              Component={ProductEditScreen}
              path="/admin/product/:id/edit"
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
