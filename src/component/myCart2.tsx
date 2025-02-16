import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useState } from "react";
import { ReturnMoney } from "./Return";
import { CartItems2 } from "./CartItems2";
import axios from "axios";

export function MyCart2({ passData }) {
  const { cartQuantity, cartItems, removeAllFromCart } = useShoppingCart();
  const [money, setMoney] = useState(0);
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = passData.find((i) => i.product_id === cartItem.product_id);
    return total + (item?.product_price || 0) * cartItem.quantity;
  }, 0);
  const exchange = money - totalPrice;
  const returnMoney = ReturnMoney({ exchange });

  const checkOut = async () => {
    if (cartItems.length !== 0 && exchange >= 0) {
      const response = await axios.post(
        "http://localhost:3000/api/update-stock",
        {
          products: cartItems,
        }
      );
      // console.log(cartItems);
      setMoney(0);
    } else if (cartItems.length !== 0) {
      alert(" not enough money");
    } else {
      alert("Please select something");
    }
  };

  // console.log(cartItems);

  return (
    <div>
      <h2>ตระกร้า</h2>

      <div>
        {cartItems?.map((item) => (
          <CartItems2
            passData2={passData}
            exchange={exchange}
            cartItems={cartItems}
            key={item.product_id}
            {...item}
          />
        ))}
      </div>

      {/* light bluse section */}
      <div style={{ backgroundColor: "lightcyan", borderRadius: "10px" }}>
        <h3>ราคารวม {totalPrice} บาท</h3>
        {/* ที่ใส่เงิน */}
        <form>
          <input
            type="text"
            placeholder="Enter money"
            onChange={(e) => setMoney(e.target.value)}
            value={money}
          ></input>
        </form>
        <button id="checkoutButton" onClick={checkOut}>
          จ่ายตัง
        </button>

        <div style={{ padding: "20px" }}>
          <div>{money > 0 && <div>รับมา : {money} บาท</div>}</div>
          <div>
            {exchange < 0 && money > 0 && <span> not enough money</span>}
          </div>
          {money >= totalPrice && (
            <div>
              เงินทอน :{" "}
              {exchange >= 0 && (
                <span>
                  {" "}
                  {exchange} baht
                  {Object.keys(returnMoney).map((key) => {
                    const value = key.split("_")[1];
                    const isBank = parseInt(value) > 10;
                    return (
                      <div
                        key={key}
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {isBank ? (
                          <div
                            className="bank"
                            style={{
                              backgroundColor: "lightGreen",
                              borderRadius: "1px",
                              width: "50px",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {value}
                          </div>
                        ) : (
                          <div
                            className="bank"
                            style={{
                              backgroundColor: "lightGrey",
                              borderRadius: "50%",
                              width: "23px",
                              height: "23px",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {value}
                          </div>
                        )}

                        <div
                          key={key}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "0.5rem",
                          }}
                        >
                          x {returnMoney[key]} {isBank ? "ใบ" : "เหรียญ"}
                        </div>
                      </div>
                    );
                  })}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
