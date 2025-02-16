"use client";

import { FC, useState, useEffect } from "react";
import styles from "./page.module.css";
import { myObj } from "@/data/data";
import { categories } from "@/data/data";

function getClick(category) {
  return <div>{category}</div>;
}

const Testpage: FC = () => {
  Object.values(myObj).map((x) => console.log(x.id));
  return (
    <div>
      <div>Show data</div>
      <div>
        categories:
        {Object.keys(categories).map((key) => (
          <div key={key} style={{ display: "float" }}>
            <button onClick={() => getClick(categories[key].text)}>
              {categories[key].text}
            </button>
          </div>
        ))}
      </div>
      {Object.keys(myObj).map((key) => {
        return (
          <h3 key={key}>
            {key} :{myObj[key].name}, id : {myObj[key].id}
            {console.log(myObj[key])}
          </h3>
        );
      })}
    </div>
    {/* <Swiper
          modules={[Navigation, EffectFade]}
          speed={800}
          spaceBetween={50}
          slidesPerView={4}
          loop
          Grid-rows={2}
          className={styles.main}
          initialSlide={objectLength}
          style={{ marginTop: "300px" }}
        >
          {Object.keys(myObj).map((key) => (
            <div key={key}>
              <SwiperSlide>
                <StoreItem {...myObj[key]}></StoreItem>
              </SwiperSlide>
            </div>
          ))}
        </Swiper> */}

        {/* <Swiper
          modules={[Navigation, EffectFade]}
          speed={800}
          spaceBetween={50}
          slidesPerView={4}
          slidesPerGroup={3}
          loop
          grid-rows={2}
          className={styles.main}
        >
          {data.map((item) => (
            <div item={item}>
              <SwiperSlide>
                <StoreItem {...item}></StoreItem>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>

        <Swiper
          modules={[Navigation, EffectFade]}
          speed={800}
          spaceBetween={50}
          slidesPerView={4}
          slidesPerGroup={3}
          loop
          Grid-rows={2}
          className={styles.main}
          initialSlide={objectLength}
          style={{ marginTop: "300px" }}
        >
          {data.map((item) => (
            <div item={item}>
              <SwiperSlide>
                <StoreItem {...data[item]}></StoreItem>
              </SwiperSlide>
            </div>
          ))}
        </Swiper> */}
  );
};

export default Testpage;
