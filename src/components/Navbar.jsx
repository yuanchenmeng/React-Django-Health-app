import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./coms.css"
import axios from "axios";


const Navbar = () => {

  const navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.setItem('user', '0');
    navigate("/home");
  };


  return (
    <nav className="outer">
      <div className=" mx-auto flex items-center justify-between px-4">
        <div className="flex items-center w-1/12 ">
          {/* Blank space */}
        </div>

        <div className="flex items-center justify-between w-7/12 ">
          <Link to="/home" className="mr-10 spantext">Home</Link>
          <Link to="/walking" className="mr-10 spantext">Walking</Link>
          <Link to="/sleep" className="mr-10 spantext">Sleep</Link>
          <Link to="/weight" className="mr-10 spantext">Weight</Link>
          <Link to="/calorie" className="mr-10 spantext">Calorie</Link>
        </div>

        <div className="flex items-center justify-end w-4/12 ">
          <Link to="/login" className="btnlogin py-1 px-5 mr-10">
            Login
          </Link>
          <button className="btnlogout py-1 px-4" onClick={HandleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;