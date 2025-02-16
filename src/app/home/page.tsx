"use client";

import { StoreItem } from "@/component/StoreItem";
import { FC, useState, useEffect } from "react";
import { myObj } from "@/data/data.js";
import styles from "./page.module.css";
import { MyCart2 } from "@/component/myCart2";
import {
  ShoppingCartProvider,
  useShoppingCart,
} from "@/context/ShoppingCartContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { categoriesTwo } from "@/data/data.js";
import axios from "axios";
import { error } from "console";

const HomePage: FC = () => {
  let slidesPerViewoption = [4, 3, 2, 1];

  //-------------------------------------------------------------
  // const allList = [];
  // Object.keys(myObj).map((key) => allList.push(myObj[key]));
  // console.log(allList);
  // allList = response.data

  const originalList = [];
  Object.keys(myObj).map((key) => {
    if (myObj[key].inStock === true) {
      originalList.push(myObj[key]);
    }
  });
  // console.log(originalList);
  // originalList = list that only available for shopping

  const outList = [];
  Object.keys(myObj).map((key) => {
    if (myObj[key].inStock !== true) {
      outList.push(myObj[key]);
    }
  });

  //Define product array ----------------------------------------------------------
  const [product, setProduct] = useState([]); // All product
  const [product_cat, setProduct_cat] = useState([]); // All product categories
  const product_instock = []; // All product instock
  product.map((obj) => {
    if (obj.product_stock !== 0) {
      product_instock.push(obj);
    }
  });

  const product_notInstock = []; //All product not instock
  product.map((obj) => {
    if (obj.product_stock === 0) {
      product_notInstock.push(obj);
    }
  });

  const [data, setData] = useState(originalList);

  const filterResult = (catItem) => {
    const result = originalList.filter((curData) => {
      return curData.categories === catItem && curData.inStock !== false;
    });
    setData(result);
  };
  //---------------------------------------------------------------------------------
  const onfetch = async () => {
    try {
      const response = await axios.get("/api/product");
      console.log(response);
      setProduct(response.data);
      // 1.Array for categories
      const product_cat = [
        ...new Set(response.data.map((Obj) => Obj.product_category)),
      ];
      setProduct_cat(product_cat);
      // setData(product);
      //console.log(product_cat);

      // 2.object that have in stock
      const product_instock = [];

      // 3.object that don't have in stock

      // const found = response["data"].find((element) => {
      //   console.log(element.product_name);
      //   return element.product_name === "น้ำสิงห์";
      // });
      // if (found === undefined) {
      //   throw new Error("หาสินค้าไม่เจอ");
      // } else {
      //   alert("success");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onfetch();
  }, []);
  console.log(data);
  //-----------------------------------------------------------
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
                onClick={() => setData(originalList)}
                className={styles.categorybutton}
              >
                ทั้งหมด
              </button>
            </div>
            {categoriesTwo.map((catName) => (
              <div className={styles.categoryButtonContainer}>
                <button
                  onClick={() => filterResult(catName)}
                  className={styles.categorybutton}
                >
                  {catName}
                </button>
              </div>
            ))}
            <button
              onClick={() => setData(outList)}
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
            {data.map((item) => (
              <div key={item.id}>
                <SwiperSlide>
                  <StoreItem {...item}></StoreItem>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>

          <div className={styles.sidebar}>
            <MyCart2></MyCart2>
          </div>
        </div>
      </ShoppingCartProvider>
    </div>
  );
};

export default HomePage;
