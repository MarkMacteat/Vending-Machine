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
  category_code: string;
  product_category: string;
  product_id: number;
  product_imgUrl: string;
  product_name: string;
  product_price: number;
  product_stock: number;
};

export function StoreItem2({
  product_category,
  product_name,
  product_price,
  product_imgUrl,
  product_stock,
  product_id,
}: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
  const quantity = getItemQuantity(product_id);

  return (
    <Tagwidget>
      <Card className="productImg">
        {product_stock !== 0 ? (
          <Card.Img
            variant="top"
            src={product_imgUrl}
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
            src={product_imgUrl}
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
        {product_stock !== 0 ? (
          <div>
            <Tagspan>{product_name} </Tagspan>
            <Tagspan>{product_price} Baht</Tagspan>
          </div>
        ) : (
          <div>
            <Tagspan style={{ color: "grey" }}>{product_name} </Tagspan>
            <Tagspan style={{ color: "grey" }}>{product_price} Baht</Tagspan>
          </div>
        )}
      </Card.Title>

      <Card>
        {quantity === 0 && product_stock !== 0 ? (
          <Tagspan>
            {/* first add to cart */}
            <div style={{ padding: "5px" }}>
              <Tagbutton onClick={() => increaseCartQuantity(product_id)}>
                <div style={{ color: "white" }}>+ Add to cart</div>
              </Tagbutton>
            </div>
          </Tagspan>
        ) : quantity === 0 && product_stock === 0 ? (
          <Tagspan>
            <div>
              <div style={{ color: "red", padding: "5px", marginTop: "2px" }}>
                Out of Stock
              </div>
            </div>
          </Tagspan>
        ) : product_stock !== 0 ? (
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
