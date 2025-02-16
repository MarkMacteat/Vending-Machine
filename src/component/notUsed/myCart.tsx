import { useShoppingCart } from "@/context/ShoppingCartContext";
import { CartItems } from "./CartItems";
import storeItems from "../../data/item.json";
import { useState } from "react";
import { ReturnMoney } from "../Return";
import { CartItems2 } from "../CartItems2";
import { myObj } from "@/data/data.js";

export function MyCart() {
  const { cartQuantity, cartItems } = useShoppingCart();
  const [money, setMoney] = useState();

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const exchange = money - totalPrice;

  //   const exchange = money - totalPrice;

  //console.log(money);
  const returnMoney = ReturnMoney({ exchange });
  return (
    <div>
      <h2>ตระกร้า {cartQuantity} </h2>

      <div>
        {cartItems?.map((item) => (
          <CartItems2 key={item.id} {...item} />
        ))}
        <h3>ราคารวม {totalPrice} บาท</h3>
      </div>

      <form>
        <input
          type="text"
          placeholder="Enter money"
          onChange={(e) => setMoney(e.target.value)}
        ></input>
        <div>receive {money} baht</div>

        {/* <div {exchange < 0 && <div>Not enough</div>}></div>
        <div>return {exchange} baht</div> */}

        {/* <button type="submit">Pay</button> */}
      </form>

      <div>{exchange < 0 && <span> not enough money</span>}</div>
      <div>
        exchange{" "}
        {exchange >= 0 && (
          <span>
            {" "}
            {exchange} baht
            {Object.keys(returnMoney).map((key) => {
              const value = key.split("_")[1];
              const isBank = parseInt(value) > 10;
              return (
                <div key={key}>
                  {isBank ? "แบงค์" : "เหรียญ"} {value} จำนวน :{" "}
                  {returnMoney[key]}
                </div>
              );
            })}
            {/* <br />
            แบงค์ 50 จำนวน {returnMoney.bank_50 || 0}
            <br />
            แบงค์ 20 จำนวน {returnMoney.bank_20 || 0}
            <br />
            เหรียญ 1 จำนวน {returnMoney.bank_1 || 0} */}
          </span>
        )}
      </div>
    </div>
  );
}
