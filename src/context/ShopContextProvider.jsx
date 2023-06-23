import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


const ShopContext = createContext(null);

const mealURL = "http://localhost:3000/meals"

function ShopContextProvider(props) {
  const [meals, setMeals] = useState([]);
  const [cartItems, setCartItems] = useState({});
  useEffect(() => {
    axios
    .get(mealURL)
    .then((response) => setMeals(response.data))
    .catch((error) => console.log(error));
    const getDefaultCart = async () => {
      const meals = await axios.get("http://localhost:3000/meals");
      let cart = {}
      meals.data.forEach((meal) => {
        cart[meal._id] = 0;
      });
      setCartItems(cart);
      };
      getDefaultCart();
    }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  }
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
  }
  console.log(cartItems)

  const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount }
  return (
    <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
  );
}

// export default ShopContextProvider;
export { ShopContextProvider, ShopContext };
