import Navigation from "./components/Navigation"
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import './assets/react-confirm-alert.css'
import Meals from "./components/Meals"
import MainPage from "./components/MainPage";
import AddMenu from "./components/AddMenu";
import AddService from "./components/AddService";
import EditMeals from "./components/editMeals";
import EditMenu from "./components/EditMenu";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./components/LoginPage";
import Orders from "./components/Orders"



import axios from "axios";
import {AuthContext} from "./context/AuthContext";
import {ShopContextProvider} from "./context/ShopContextProvider";
import {ShopContext} from "./context/ShopContextProvider";
import { useContext } from "react";
import Cart from "./components/Cart"
axios.defaults.withCredentials = true;

function App() {
  const { loggedIn, isAdmin } = useContext(AuthContext);
  

  return (
    <>
    <Navigation />
    <ShopContextProvider>
    <Routes>
    {loggedIn ? (
      <Route>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/meals/:title" element={<Meals/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/orders" element={<Orders/>} />
        {isAdmin && (
          <>
              <Route path="addmenu" element={<AddMenu/>} />
              <Route path="editmeals/:id" element={<EditMeals/>} />
              <Route path="editmenu/:id" element={<EditMenu/>} />
              <Route path="addmeals" element={<AddService/>} />
              </>
            )}
      </Route>
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
      <Route path="/signup" element={<RegisterForm />} />
    </Routes>
    </ShopContextProvider>
    </>
    
  )
}

export default App
