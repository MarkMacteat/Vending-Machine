import { NextResponse } from "next/server";
import db from "../../config/db";
var express = require("express");

export async function POST(req: Request, context: any) {
  try {
    const data = await req.json();
    let count = 0;
    console.log(data);
    console.log("hello world");

    const result = await new Promise((resolve, rejects) => {
      for (let product of data.products) {
        console.log(product);
        db.query(
          `
                      UPDATE stock
                      SET 
                          product_stock = product_stock - ?
                      WHERE product_id = ?
                  `,
          [product.quantity, product.product_id],

          (err: any, result: []) => {
            console.log(err);
            count = count + 1;
            if (count === data.products.lenght) {
              resolve("success");
            }
          }
        );
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
