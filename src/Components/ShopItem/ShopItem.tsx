import React from "react";

import { Flex, Button } from "@mantine/core";

import { RootState, useAppDispatch } from "../../Redux/store";
import { ICartItem, addItem } from "../../Redux/Cart.slice";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Product } from "../../interfaces/shop";
const ShopItem = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const currentShop = useSelector(
    (state: RootState) => state.shops.currentShop
  );
  const addCartItem = () => {
    if (currentShop) {
      const newCartItem: ICartItem = {
        ...product,
        count: 0,
        shop: currentShop,
      };
      dispatch(addItem(newCartItem));
    }
  };
  return (
    <ProductWrapper direction="column">
      <ProductHeading>{product.title}</ProductHeading>
      <div key={product.description}>
        <img
          width="300px"
          height="300px"
          src={product.cover}
          alt={product.title}
        />
        <Flex justify="space-between" align="center">
          <Price>{product.price} UAH</Price>
          <Button color="yellow" onClick={addCartItem} variant="filled">
            Order
          </Button>
        </Flex>
        <p>{product.description}</p>
      </div>
    </ProductWrapper>
  );
};
const ProductWrapper = styled(Flex)`
  border-radius: 8px;
  border: 1px solid gray;
  padding: 5px 10px;
  margin: 5px 10px;
`;
const ProductHeading = styled.h3`
  text-transform: uppercase;
`;
const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
`;
export default ShopItem;
