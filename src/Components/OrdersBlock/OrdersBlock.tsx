import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Flex } from "@mantine/core";
import OrderItem from "../OrderItem/OrderItem";
import styled from "styled-components";
const OrdersBlock = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  return (
    <Wrapper>
      <Flex justify="flex-start" gap="lg" wrap="wrap">
        {cartItems.items.length ? (
          cartItems.items.map((item) => {
            return <OrderItem key={item._id} data={item} />;
          })
        ) : (
          <Flex
            ml={"20px"}
            mt={"20px"}
            align="center"
            justify="center"
            direction="column"
          >
            <Placeholder>Nothing here</Placeholder>
          </Flex>
        )}
      </Flex>
    </Wrapper>
  );
};
const Placeholder = styled.span`
  font-size: 40px;
  font-weight: 700;
  color: #c3c3c3;
`;

const Wrapper = styled.div`
  width: 50%;
  overflow-y: scroll;
  border: 2px solid gray;
`;

export default OrdersBlock;
