"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { StoreItem } from "@/component/StoreItem";
import { FC } from "react";
import { myObj } from "@/data/data.js";
import { MyCart2 } from "@/component/myCart2";

import {
  ShoppingCartProvider,
  useShoppingCart,
} from "@/context/ShoppingCartContext";

export default () => {
  const { cartQuantity, cartItems } = useShoppingCart();
  return (
    <ShoppingCartProvider>
      <Swiper
        modules={[Navigation, EffectFade]}
        navigation
        speed={800}
        spaceBetween={50}
        slidesPerView={8}
        loop
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        grid-rows={2}
      >
        {Object.keys(myObj).map((key) => (
          <div key={key}>
            <SwiperSlide>
              <StoreItem {...myObj[key]}></StoreItem>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>

      <div>
        <MyCart2></MyCart2>
      </div>
    </ShoppingCartProvider>
  );
};
