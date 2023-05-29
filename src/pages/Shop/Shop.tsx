import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../Redux/store";
import { fetchShopProducts } from "../../Redux/Shops.slice";
import { useSelector } from "react-redux";
import { Flex } from "@mantine/core";
import ShopItem from "../../Components/ShopItem/ShopItem";
import { Product } from "../../interfaces/shop";
const Shop = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => {
    if (state.shops.currentShop) return state.shops.currentShop.products;
  }) as Product[];
  const isLoaded = useSelector((state: RootState) => {
    if (state.shops.currentShop)
      return state.shops.currentShop.status === "loaded";
  });
  useEffect(() => {
    dispatch(fetchShopProducts(id as string));
  }, [id]);
  return (
    <Flex
      style={{ width: "100%" }}
      wrap="wrap"
      gap="lg"
      justify="space-between"
      align="center"
    >
      {(!isLoaded ? [] : products).map((product: Product) => {
        return <ShopItem product={product} />;
      })}
    </Flex>
  );
};

export default Shop;
