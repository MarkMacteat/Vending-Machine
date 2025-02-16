import { NextResponse } from "next/server";
import db from "../../config/db";
var express = require("express");

export async function POST(req: Request, context: any) {
  try {
    const data = await req.json();
    console.log(data);
    console.log(data.phone, data.pin);

    const result = await new Promise((resolve, rejects) => {
      db.query(
        `INSERT INTO users (phone_number,pin,spending)
            VALUES (?,?,0)
          `,
        [data.phone, data.pin],

        (err: any, result: []) => {
          if (err) {
            rejects(err);
          } else {
            resolve(result);
          }
        }
      );
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
