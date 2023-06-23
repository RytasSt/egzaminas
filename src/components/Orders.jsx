import axios from "axios";
import { useState, useEffect } from "react";
import { deleteHandler } from "../../services/deleteHandler copy";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./orders.scss"
import {AuthContext} from "./../context/AuthContext";
import { useContext } from "react";

const mealsURL = "http://localhost:3000/meals";
const ordersURL = "http://localhost:3000/orders";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [meals, setMeals] = useState([]);
  const [confirmedOrderIds, setConfirmedOrderIds] = useState([]);
  const { loggedIn, isAdmin } = useContext(AuthContext);


  useEffect(() => {
    axios
      .get(ordersURL)
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
    axios
      .get(mealsURL)
      .then((response) => setMeals(response.data))
      .catch((error) => console.log(error));
  }, [])



  const handleConfirmOrder = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        const updatedOrder = { ...order, status: "active" };
        axios.patch(ordersURL + "/" + orderId, updatedOrder)
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        return updatedOrder;
      }
      return order;
    });
  
    setOrders(updatedOrders);
  };


  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        const updatedOrder = { ...order, status: "canceled" };
        axios.patch(ordersURL + "/" + orderId, updatedOrder)
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        return updatedOrder;
      }
      return order;
    });
  
    setOrders(updatedOrders);
  };
  const handleEditRegistrationDate = (orderId, newDate) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        const updatedOrder = { ...order, registrationDate: newDate.toISOString() };
        axios
          .patch(ordersURL + "/" + orderId, updatedOrder)
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
        return updatedOrder;
      }
      return order;
    });

    setOrders(updatedOrders);
  };
  // const filteredOrders = isAdmin
  //   ? orders 
  //   : orders.filter((order) => order.userId === userId);
    
  const orderjsx = orders.map((order) => {
    const { _id, cartItems, status, name, registrationDate } = order;
    const isConfirmed = confirmedOrderIds.includes(_id)
    const selectedItems = Object.entries(cartItems).filter(
      ([mealId, count]) => count > 0
    );
  
    const selectedItemsList = selectedItems.map(([mealId, count]) => {
      const meal = meals.find((meal) => meal._id === mealId);
  
      if (meal) {
        return (
          <li key={mealId}>
            {meal.title} - Quantity: {count}
            
          </li>
        );
      }
      return null;
    });
  
    // Render the order card
    return (
      <div key={_id} className="orderCard">
        <h3>Order ID: {_id}</h3>
        <div>Order by user: {name}</div>
        status: {status}
        {/* Registracijos data: {registrationDate} */}
        <div>
          <DatePicker
            selected={new Date(registrationDate)}
            onChange={(date) => handleEditRegistrationDate(_id, date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            minDate={new Date()}
          />
        </div>
        <ul>{selectedItemsList}</ul>
        {isConfirmed ? (
          <p>Order confirmed</p>
        ) : (
          <>
          {isAdmin && (
          <>
            <button onClick={() => handleConfirmOrder(_id)}>Confirm Order</button>

          </>)}
            <button onClick={() => handleCancelOrder(_id)}>Cancel Order</button>
          </>
        )}
      </div>
    );
  });
  return (
    <>

      <div className="menuWrapper">
        <div className="menuTitle"><p>Meals</p></div>
        <div className="ordersContainer">
          {orderjsx}
        </div>
        <div>
        </div>
      </div>

    </>
  );
}

export default Orders;