import React, { useRef, useState } from "react";

import { Flex } from "@mantine/core";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import ContactForm from "../../Components/ContactForm/ContactForm";
import OrdersBlock from "../../Components/OrdersBlock/OrdersBlock";
import { fetchCreateOrder } from "../../Redux/Shops.slice";
import styled from "styled-components";
import { IContact } from "../../interfaces/contact-form";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Redux/Cart.slice";
const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const adress = useSelector((state: RootState) => state.shops.adress);
  const {
    formState: { errors },
    setError,
    reset,
    control,
    handleSubmit,
  } = useForm<IContact>({
    mode: "onSubmit",
  });

  const onSubmitHandler = async (values: IContact) => {
    if (!cartItems.length) return;
    dispatch(
      fetchCreateOrder({ ...values, adress, orders: [...cartItems] })
    ).then(() => {
      dispatch(clearCart());
      navigate("/shops/main");
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Flex
          style={{ height: "85vh" }}
          align="stretch"
          gap="lg"
          justify="space-between"
        >
          <ContactForm control={control} />
          <OrdersBlock />
        </Flex>
        <Flex align={"center"} justify={"flex-end"} gap="lg" mt={20}>
          <TotalPrice>Total price: {totalPrice}</TotalPrice>
          <Button uppercase mr={20} size="lg" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

const TotalPrice = styled.span`
  font-size: 30px;
  font-weight: 700;
`;
export default ShoppingCart;
