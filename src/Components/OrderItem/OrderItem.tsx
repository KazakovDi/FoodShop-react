import React from "react";
import { addItem, removeItem, minusCount } from "../../Redux/Cart.slice";
import { Flex, Button } from "@mantine/core";
import { useAppDispatch } from "../../Redux/store";
import { ICartItem } from "../../Redux/Cart.slice";
import styled from "styled-components";

const OrderItem = ({ data }: { data: ICartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <ListItem>
      <Button
        style={{ position: "absolute", top: "5px", right: "5px" }}
        onClick={() => dispatch(removeItem(data))}
        color="red"
      >
        Remove
      </Button>
      <img width="220px" height="220px" src={data.cover} alt={data.title} />
      <Flex align="center" justify="space-between">
        <h3>{data.title}</h3>
        <Price>{data.price} UAH</Price>
      </Flex>
      <Controls gap="sm" align="center">
        <Button
          variant="filled"
          color="pink"
          disabled={data.count === 1}
          onClick={() => dispatch(minusCount(data))}
        >
          -
        </Button>
        <Count>{data.count}</Count>
        <Button variant="filled" onClick={() => dispatch(addItem(data))}>
          +
        </Button>
      </Controls>
    </ListItem>
  );
};
const Count = styled.span`
  font-size: 20px;
  font-weight: 700;
`;
const Controls = styled(Flex)``;
const Price = styled.span`
  font-weight: 700;
`;
const ListItem = styled.div`
  border-radius: 10px;
  border: 1px solid #000;
  margin: 5px 10px;
  position: relative;
  padding: 0px 15px;
  padding-bottom: 10px;
`;
export default OrderItem;
