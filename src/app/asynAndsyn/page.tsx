"use client";
import { promises } from "dns";
import { FC, useState } from "react";

const HomePage: FC = () => {
  // let a = 1;
  // let b = 2;

  // setTimeout(function () {
  //   console.log("Async");
  // }, 100);

  // fetch("/").then(function () {
  //   console.log("Fetch");
  // });

  // console.log("Synchronous");

  // console.log(a);
  // console.log(b);
  // return <div>hello</div>;

  //promise
  let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
      resolve("Success");
    } else {
      reject("Fail");
    }
  });

  p.then((message) => {
    console.log("this is in the then " + message);
  }).catch((message) => {
    console.log("this is in catch " + message);
  });
};

export default HomePage;
