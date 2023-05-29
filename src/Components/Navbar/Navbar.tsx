import { Flex, Button } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IconShoppingCart } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { logout } from "../../Redux/Auth.slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const counter = useSelector((state: RootState) => {
    return state.cart.items
      ? state.cart.items.reduce((sum, item) => {
          return (sum += item.count);
        }, 0)
      : 0;
  });
  return (
    <Nav>
      <NavContent gap="lg" align="center" justify="flex-start">
        <Link to="/shops/main">
          <Logo>ShopiFood</Logo>
        </Link>
        <Link to="/shops/shopping-cart">
          <CartItem>
            <IconShoppingCart />
            <Counter>{counter}</Counter>
          </CartItem>
        </Link>
        <Button
          variant="subtle"
          size="lg"
          onClick={() => {
            dispatch(logout());
            navigate("auth/sign-in");
          }}
        >
          Logout
        </Button>
      </NavContent>
    </Nav>
  );
};
const Counter = styled.p`
  color: #fff;
  background-color: #000;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0;
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
  line-height: 30px;
`;
const CartItem = styled.div`
  color: #000;
  position: relative;
  svg {
    width: 40px;
    height: 40px;
  }
`;
const Nav = styled.nav`
  border-bottom: 1px solid #000;
  width: 100%;
  display: block;
`;
const NavContent = styled(Flex)`
  margin: 0 5%;
`;
const Logo = styled.h1`
  color: #000;
  font-size: 30px;
`;

export default Navbar;
