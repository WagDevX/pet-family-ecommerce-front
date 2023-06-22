const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContexrProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : {};
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
        setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  },[]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
    })
  }

  function clearCart() {
      setCartProducts([]);
      ls.setItem("cart", JSON.stringify([]));
    }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
 
}
  
