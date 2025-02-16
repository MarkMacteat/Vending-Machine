import { useShoppingCart } from "@/context/ShoppingCartContext";
import storeItems from "../data/item.json";
import styled from "@emotion/styled";

type CartItemProps = {
  id: number;
  quantity: number;
};

const Tagspan = styled("span")`
  display: flex;
  justify-content: center;
  vertical-align: middle;
`;

export function CartItems({ id, quantity }: CartItemProps) {
  const {
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    cartItems,
  } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Tagspan
      style={{
        background: "grey",
        borderRadius: "10px",
        margin: "1rem",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <img
        src={item.imgUrl}
        style={{
          width: "125 px",
          height: "75px",
          objectFit: "cover",
          float: "left",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div>
          {/* ปุ่มเพิ่มลด + จำนวน */}
          <span>
            <div style={{ paddingRight: "5px" }}>
              <button onClick={() => decreaseCartQuantity(id)}> - </button>
            </div>
            {item.name} {quantity > 1 && <span>x{quantity}</span>}
            <div style={{ paddingLeft: "5px" }}>
              <button onClick={() => increaseCartQuantity(id)}> + </button>
            </div>
          </span>
        </div>
        {/* ราคา*จำนวน */}
        <div>{item.price * quantity} Baht</div>
        {/* จำนวน */}
        <div style={{ backgroundColor: "blue" }}> {quantity} </div>
        {/* ปุ่มremove */}
        <button onClick={() => removeFromCart(id)}>remove</button>
      </div>
    </Tagspan>
  );
}
