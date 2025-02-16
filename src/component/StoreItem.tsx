"use client";

import styled from "@emotion/styled";
import { Card } from "react-bootstrap";
import { useShoppingCart } from "@/context/ShoppingCartContext";

const Tagwidget = styled("div")`
  justify-content: center;
  align-item: center;
  position: relative;
  float: left;
  margin-right: 0.5rem;
  margin-left: 0.5rem;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  margin-bottom: 2rem;
  height: 250px;
  widht: 100px;

  border-radius: 10px;
`;

const Tagspan = styled("span")`
  display: flex;
  justify-content: center;
`;

const Tagbutton = styled("button")`
  border-radius: 12px;
  border: none;
  padding: 7px;
  background-color: blue;
`;

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  inStock: boolean;
  categories: string;
};

export function StoreItem({
  id,
  name,
  price,
  imgUrl,
  inStock,
  categories,
}: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Tagwidget>
      <Card className="productImg">
        {inStock === true ? (
          <Card.Img
            variant="top"
            src={imgUrl}
            height="140px"
            style={{
              objectFit: "cover",
              marginBottom: "10px",
              paddingTop: "10px",
            }}
          />
        ) : (
          <Card.Img
            variant="top"
            src={imgUrl}
            height="140px"
            style={{
              objectFit: "cover",
              filter: "grayscale(1)",
              marginBottom: "10px",
              paddingTop: "10px",
            }}
          />
        )}
      </Card>
      <Card.Title>
        {inStock == true ? (
          <div>
            <Tagspan>{name} </Tagspan>
            <Tagspan>{price} Baht</Tagspan>
          </div>
        ) : (
          <div>
            <Tagspan style={{ color: "grey" }}>{name} </Tagspan>
            <Tagspan style={{ color: "grey" }}>{price} Baht</Tagspan>
          </div>
        )}
      </Card.Title>

      <Card>
        {quantity === 0 && inStock == true ? (
          <Tagspan>
            {/* first add to cart */}
            <div style={{ padding: "5px" }}>
              <Tagbutton onClick={() => increaseCartQuantity(id)}>
                <div style={{ color: "white" }}>+ Add to cart</div>
              </Tagbutton>
            </div>
          </Tagspan>
        ) : quantity === 0 && inStock == false ? (
          <Tagspan>
            <div>
              <div style={{ color: "red", padding: "5px", marginTop: "2px" }}>
                Out of Stock
              </div>
            </div>
          </Tagspan>
        ) : inStock === true ? (
          <div style={{ marginTop: "7px", marginBottom: "5.5px" }}>
            <Tagspan>
              <div style={{ color: "blue" }}>
                <span>{quantity}</span> in cart
              </div>
            </Tagspan>
          </div>
        ) : (
          <Tagspan>
            <div>
              <div style={{ color: "red", padding: "5px" }}>Out of Stock</div>
            </div>
          </Tagspan>
        )}
      </Card>
    </Tagwidget>
  );
}
