import "./menu.scss"
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { deleteHandler } from "./../../services/deleteHandler copy";


const menuURL = "http://localhost:3000/menu";
const mealsURL = "http://localhost:3000/meals";
function Menu() {
    const [menu, setMenu] = useState([]);
    const [meals, setMeals] = useState([]);
    const [menuData, setMenuData] = useState([]);


    useEffect(() => {
        axios
            .get(menuURL)
            .then((response) => setMenu(response.data))
            .catch((error) => console.log(error));
        axios
            .get(mealsURL)
            .then((response) => setMeals(response.data))
            .catch((error) => console.log(error));
    }, [])

    // const handleViewMeals = (menu) => {
    //     // Logic to filter meals based on the selected menuId
    //     const filteredMeals = meals.filter((meal) => meal.menu === menu);
      
    //     // Perform any necessary actions with filteredMeals (e.g., redirect to a new page)
    //     console.log(filteredMeals);
    //   };

    function deleteMenu(id) {
        axios
        .delete(menuURL + "/" + id)
        .then((response) => {
            setMenuData(menuData.filter((menu) => menu._id !== id));
            setMenu(menu.filter((menu) => menu._id !== id));
        })
        .catch((error) => console.log(error));
      }

    let menujsx = menu.map((item, index) => {
        return (
            <div className="menuCard" key={index}>
                <div className="menuCardTitle" key={index}>{item.title}</div>

                <Link to={"/meals/" + item.title} >
                    <button 
                    // onClick={() => handleViewMeals(item.title)}
                    >
                        View</button>
                </Link>
                <Link to={"/editmenu/" + item._id} >
                    <button>Edit</button>
                </Link>
                <button onClick={() => {
                deleteHandler(item, deleteMenu);
              }}>
                    Delete
                </button>
            </div>
        )
    })
    return (
        <>
            <div className="menuWrapper">
                <div className="menuTitle"><p>Menu</p></div>
                <div className="menuContainer">
                    {menujsx}
                </div>
            </div>
        </>
    );
}

export default Menu;