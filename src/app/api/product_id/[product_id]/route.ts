import { NextResponse } from "next/server";
import db from "../../../config/db";
var express = require("express");

export async function PATCH(req: Request, context: any) {
  try {
    const result = await new Promise((resolve, rejects) => {
      const { product_id } = context.params;
      db.query(
        // "SELECT * FROM `products`  WHERE `product_id` = ? ",
        // [parseInt(product_id)],
        `SELECT p.product_id, p.product_name, s.product_stock FROM products p 
        join stock s on p.product_id = s.product_id  
        WHERE p.product_id = ? `,
        [parseInt(product_id)],
        (err: any, result: []) => {
          if (err) {
            rejects(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
