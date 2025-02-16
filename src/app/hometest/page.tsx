"use client";

import { StoreItem2 } from "@/component/StoreItem2";
import { FC, useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { MyCart2 } from "@/component/myCart2";
import {
  ShoppingCartProvider,
  useShoppingCart,
} from "@/context/ShoppingCartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";

const HomePage: FC = () => {
  let slidesPerViewoption = [4, 3, 2, 1];

  const [activeProduct_cat, setActiveProduct_cat] = useState("all");
  const [product, setProduct] = useState([]); // All product
  const [product_cat, setProduct_cat] = useState([]); // All product categories

  useEffect(() => {
    const onfetch = async () => {
      try {
        const response = await axios.get("/api/product");
        console.log(response);
        // console.log(response.data);
        setProduct(response.data);
        setProduct_cat([
          ...new Set(response.data.map((obj) => obj.product_category)),
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    onfetch();
  }, []);

  console.log(product);

  return (
    <div className={styles.body}>
      <ShoppingCartProvider className={styles.body}>
        <div className={styles.topNavContainer}>
          <div className={styles.labelContainer}>
            <label for="toggle" className={styles.label}>
              &#9776;
            </label>
            <input type="checkbox" id="toggle" className={styles.toggle} />
            <button className={styles.cartButton}>cart</button>
          </div>
          <div className={styles.catContainer}>
            <div>
              <button
                onClick={() => setActiveProduct_cat("all")}
                className={styles.categorybutton}
              >
                ทั้งหมด
              </button>
            </div>
            {product_cat.map((catName) => (
              <div className={styles.categoryButtonContainer}>
                <button
                  onClick={() => setActiveProduct_cat(catName)}
                  className={styles.categorybutton}
                >
                  {catName}
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveProduct_cat("none")}
              className={styles.categorybutton}
            >
              หมด
            </button>
          </div>
        </div>

        <div className={styles.container}>
          <Swiper
            speed={800}
            spaceBetween={50}
            slidesPerView={slidesPerViewoption[0]}
            slidesPerGroup={4}
            breakpoints={{
              320: {
                width: 320,
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className={styles.main}
          >
            {product
              .filter((item) =>
                activeProduct_cat === "all"
                  ? true
                  : activeProduct_cat === "none"
                  ? item.product_stock === 0
                  : item.product_category === activeProduct_cat &&
                    item.product_stock > 0
              )
              .map((item) => (
                <div key={item.product_id}>
                  <SwiperSlide>
                    <StoreItem2 {...item}></StoreItem2>
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>

          <div className={styles.sidebar}>
            <MyCart2 passData={product}></MyCart2>
          </div>
        </div>
      </ShoppingCartProvider>
    </div>
  );
};

export default HomePage;
