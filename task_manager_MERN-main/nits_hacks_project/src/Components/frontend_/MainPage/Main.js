import {React,useEffect, useState} from "react";
import UserCarousel from "../UserCarousel/UserCarousel";
import User from "../UserForm/User";
import Cards from "./Cards";
import './main.css'
import Navbar from "./Navbar";

const Main = ({todo,setTodo,userName}) => {
  
  return (
    <div>
      <Navbar userName={userName}/>
      {/* <Cards  todo={todo} setTodo={setTodo}/> */}
      <User/>
      <UserCarousel/>
    </div>
  );
};

export default Main;
