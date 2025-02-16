import { NextResponse } from "next/server";
import db from "../../config/db";
var express = require("express");

export async function GET() {
  try {
    const result = await new Promise((resolve, rejects) => {
      db.query(
        `SELECT * FROM products p  
        LEFT JOIN prices on p.product_id = prices .product_id 
        LEFT JOIN categories c on p.category_code = c.category_code  
        LEFT JOIN stock s on p.product_id = s.product_id ORDER BY s.product_stock DESC, p.product_id ASC `,
        (err: any, result: []) => {
          if (err) {
            rejects(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    console.log(result);
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
// import type { NextApiRequest, NextApiResponse } from 'next'

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "MarkMacteat2004",
//   database: "data",
//   port: "3307",
// });

// export default (req: NextApiRequest,res: NextApiResponse) => {
//   connection.query(`SELECT * FROM products p
//           LEFT JOIN prices on p.product_id = prices .product_id
//           LEFT JOIN categories c on p.category_code = c.category_code
//           LEFT JOIN stock s on p.product_id = s.product_id ORDER BY s.product_stock DESC, p.product_id ASC `)
//     function(err: any,results: any){
//       console.log(results)
//       res.status(200).json(results)
//     }

// }
