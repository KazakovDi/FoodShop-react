import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shops from "./pages/Shops/Shops";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Main from "./features/Main/Main";
import Shop from "./pages/Shop/Shop";
import { fetchAuthMe } from "./Redux/Auth.slice";
import { useAppDispatch } from "./Redux/store";
import { getCartState } from "./Redux/Cart.slice";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCartState());
    dispatch(fetchAuthMe());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sign-in" element={<Login />} />
        <Route path="/auth/sign-up" element={<Register />} />

        <Route path="/shops" element={<Main />}>
          <Route path="main" element={<Shops />}>
            <Route path=":id" element={<Shop />} />
          </Route>
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/auth/sign-in" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
