import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { deleteHandler } from "./../../services/deleteHandler copy";
import { ShopContext } from ".././context/ShopContextProvider";

const mealsURL = "http://localhost:3000/meals";

function Meals() {
    const { addToCart, cartItems } = useContext(ShopContext)
    const { title } = useParams();
    const [meals, setMeals] = useState([]);
    const [mealData, setMealData] = useState([]);

    
    useEffect(() => {
        axios
            .get(mealsURL)
            .then((response) => setMeals(response.data))
            .catch((error) => console.log(error));
    }, [])
    function deleteMeal(id) {
        axios
          .delete(mealsURL + "/" + id)
          .then((response) => {
            setMealData(mealData.filter((meal) => meal._id !== id));
            setMeals(meals.filter((meal) => meal._id !== id))
          })
          .catch((error) => console.log(error));
          
      }
    const filteredMeals = meals.filter((meal) => meal.menu === title);
 
    let mealsjsx = filteredMeals.map((meal, index) => {
        // const simpleID = index + 1;
        const cartItemAmount = cartItems[meal._id]
        return (
            <div className="menuCard" key={index}>
                {/* <div>{simpleID}</div> */}
                <div>{meal.title}</div>
                <div>{meal.description}</div>
                <div>{meal.menu}</div>
                <div>{cartItemAmount > 0 && <> Amount: {cartItemAmount}</>}</div>
                <button onClick={() => addToCart(meal._id)}>Add to cart</button>
                <Link to={"/editmeals/" + meal._id}>
                    <Button>Edit</Button>
                </Link>
                <button onClick={() => {
                deleteHandler(meal, deleteMeal);
              }}>
                    Delete
                </button>
            </div>
        )
    })
    return (
        <>
            <div className="menuWrapper">
                <div className="menuTitle"><p>Meals</p></div>
                <div className="menuContainer">
                    {mealsjsx}
                </div>
            </div>
        </>
    );
}

export default Meals;