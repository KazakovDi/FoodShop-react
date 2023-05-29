import React, { useEffect } from "react";

import { Outlet, Link } from "react-router-dom";
import { Flex } from "@mantine/core";
import { fetchShops } from "../../Redux/Shops.slice";
import { useAppDispatch, RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ShopItem } from "../../interfaces/shop";
const Shops = () => {
  const dispatch = useAppDispatch();
  const shops = useSelector((state: RootState) => state.shops.data);
  const activeShop = useSelector((state: RootState) => state.cart.shop);
  useEffect(() => {
    dispatch(fetchShops());
  }, []);
  return (
    <Flex>
      <div>
        <ShopsHeading>Shops</ShopsHeading>
        <Flex gap="lg" direction="column" justify="flex-start">
          {shops.map((shop: ShopItem, index) => {
            return (
              <>
                {activeShop && shop.title !== activeShop.title ? (
                  <UnactiveShop
                    width="200px"
                    height="200px"
                    src={shop.cover}
                    alt={shop.title}
                  />
                ) : (
                  <Link key={index} to={`${shop._id}`}>
                    <img
                      alt={shop.title}
                      width="200px"
                      height="200px"
                      src={shop.cover}
                    />
                  </Link>
                )}
              </>
            );
          })}
        </Flex>
      </div>
      <Outlet />
    </Flex>
  );
};
const ShopsHeading = styled.h1`
  text-align: center;
`;
const UnactiveShop = styled.img`
  opacity: 0.4;
  pointer-events: none;
`;
export default Shops;
