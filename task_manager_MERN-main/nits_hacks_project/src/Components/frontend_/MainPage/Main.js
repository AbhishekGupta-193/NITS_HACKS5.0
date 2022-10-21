import {React,useEffect, useState} from "react";
import User from "../User/User";
import Cards from "./Cards";
import './main.css'
import Navbar from "./Navbar";

const Main = ({todo,setTodo,userName}) => {
  
  return (
    <div>
      <Navbar userName={userName}/>
      {/* <Cards  todo={todo} setTodo={setTodo}/> */}
      <User/>
    </div>
  );
};

export default Main;
