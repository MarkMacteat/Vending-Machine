import { useContext, createContext, ReactNode, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  product_id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (product_id: number) => number;
  increaseCartQuantity: (product_id: number) => void;
  decreaseCartQuantity: (product_id: number) => void;
  removeFromCart: (product_id: number) => void;
  removeAllFromCart: () => void;

  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(product_id: number) {
    //check current item quantity
    return (
      cartItems.find((item) => item.product_id === product_id)?.quantity || 0
    );
  }
  function increaseCartQuantity(product_id: number) {
    setCartItems((currItems) => {
      // case no item
      if (currItems.find((item) => item.product_id === product_id) == null) {
        return [...currItems, { product_id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          //.map() is create new array from original array through function
          if (item.product_id === product_id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(product_id: number) {
    setCartItems((currItems) => {
      // case number of item equal one
      if (
        currItems.find((item) => item.product_id === product_id)?.quantity === 1
      ) {
        return currItems.filter((item) => item.product_id !== product_id);
      } else {
        return currItems.map((item) => {
          if (item.product_id === product_id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(product_id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.product_id !== product_id);
    });
  }

  function removeAllFromCart() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        removeAllFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
