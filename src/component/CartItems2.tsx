import { useShoppingCart } from "@/context/ShoppingCartContext";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

type CartItemProps = {
  product_id: number;
  quantity: number;
};

const Tagspan = styled("span")`
  background-color: lightcyan;
  border-radius: 10px;
  margin: 1rem;
  boxshadow: 0 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  position: relative;
`;

const Tagsection = styled("section")`
  float: left;
  display: flex;
`;

const Tagimg = styled("img")`
  width: 50px;
  height: 75px;
  float: left;
  object-fit: cover;
  padding: 10px;
`;

const Quantitydiv = styled("div")`
  border-radius: 5px;
  background-color: blue;
  width: 25px;
  margin: 1px;
  color: white;
`;

const Minusbutton = styled("button")`
  margin-right: 10px;
`;

const Plusbutton = styled("button")`
  margin-left: 10px;
`;

const Tagdivnp = styled("div")`
  float: left;
  margin-top: 10%;
  margin-left: 10px;
  position: relative;
  width: 100px;
`;

export function CartItems2({
  passData2,
  exchange,
  cartItems,
  product_id,
  quantity,
  ...prop
}: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  const item = passData2.find((i) => i.product_id === product_id);
  if (item == null) return null;
  console.log(prop);

  const [stock, setStock] = useState(20);

  return (
    <Tagspan>
      <Tagsection className="left">
        <Tagimg src={item.product_imgUrl} />

        <Tagdivnp>
          <div style={{ left: "0px", position: "absolute" }}>
            {item.product_name}
          </div>
          <div
            style={{
              left: "0px",
              position: "absolute",
              top: "20px",
              fontSize: "14px",
              color: "grey",
            }}
          >
            {item.product_price * quantity}
          </div>
          <div
            style={{
              left: "0px",
              position: "absolute",
              top: "35px",
              fontSize: "14px",
              color: "grey",
            }}
          >
            บาท
          </div>
        </Tagdivnp>

        <button
          style={{
            borderRadius: "20%",
            backgroundColor: "red",
            border: "none",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
          onClick={() => removeFromCart(product_id)}
        >
          X
        </button>

        <div style={{ right: "10px", position: "absolute", marginTop: "10%" }}>
          <span style={{ display: "flex" }}>
            <Minusbutton onClick={() => decreaseCartQuantity(product_id)}>
              {" "}
              -{" "}
            </Minusbutton>
            <Quantitydiv>{quantity}</Quantitydiv>
            <Quantitydiv>{stock - quantity}</Quantitydiv>
            <Plusbutton onClick={() => increaseCartQuantity(product_id)}>
              {" "}
              +{" "}
            </Plusbutton>
          </span>
        </div>
      </Tagsection>
    </Tagspan>
  );
}
