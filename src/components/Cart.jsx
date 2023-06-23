import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from ".././context/ShopContextProvider";
import "./cart.scss"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const mealsURL = "http://localhost:3000/meals";
const ordersURL = "http://localhost:3000/orders";

function Cart() {
  const [meals, setMeals] = useState([]);
  const [userData, setUserData] = useState({});
  const [orderSent, setOrderSent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  useEffect(() => {
    axios
      .get(mealsURL)
      .then((response) => setMeals(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:3000/users/getName")
      .then((res) => setUserData(res.data))
      .catch((error) => console.log(error));
  }, [])
  const placeOrder = () => {
    const dateString = selectedDate ? selectedDate.toLocaleDateString() : "";
    const orderData = {
      cartItems: cartItems,
      name: userData.name,
      registrationDate: dateString,
      status: "new"
      // customerName: customerName,
    };
    console.log(dateString)
    axios
      .post(ordersURL, orderData)
      .then((response) => {
        setOrderSent(true);
        console.log(response.data);
      })
      .catch((error) => {
        setOrderSent(false);
        console.log(error);
      });
  }
  return (
    <>
      <div className="cart">
        <div>
        </div>
        {/* <div className="cartContainer"> */}
        <div className="menuWrapper">
          <div className="menuTitle"><p>Cart items</p></div>
          <div className="menuContainer">
            {meals.map((meal, index) => {
              if (cartItems[meal._id] !== 0) {
                return (
                  <div className="menuCard" key={index}>
                    <div>{meal.title}</div>
                    <div>{meal.description}</div>
                    <div>{meal.menu}</div>
                    <div className="countHandler">
                      <button onClick={() => removeFromCart(meal._id)}>-</button>
                      <input style={{ width: "40px" }} value={cartItems[meal._id]} onChange={(e) => updateCartItemCount(Number(e.target.value), meal._id)} />
                      <button onClick={() => addToCart(meal._id)}>+</button>
                    </div>
                    <div className="datePickerWrapper">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText="Select a date"
                        minDate={new Date()}
                      />
                    </div>

                  </div>
                )
              }
            })}
          </div>
          <div className={`cart`}>
            <div>
              <button className="orderButton" onClick={placeOrder}>
                Order
              </button>
              {orderSent && <p className="orderSuccess">Order successfully sent!</p>}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Cart;