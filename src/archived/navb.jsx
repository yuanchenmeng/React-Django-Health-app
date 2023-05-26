import React, {useEffect, useState, useCallback, useRef} from 'react';
import { Link } from 'react-router-dom';
import "../components/coms.css"


const Navbar = () => {
  return (
    <nav className="outer">
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <div className="flex items-center w-10">
          {/* Blank space */}
        </div>

        <div className="flex items-center justify-between w-70">
          <Link to="/home" className="mr-10 spantext">Home</Link>
          <Link to="/walking" className="mr-10 spantext">Walking</Link>
          <Link to="/sleep" className="mr-10 spantext">Sleep</Link>
          <Link to="/weight" className="mr-10 spantext">Weight</Link>
          <Link to="/calorie" className="mr-10 spantext">Calorie</Link>
        </div>


        <div className="flex items-center justify-between w-20">
          <Link to="/login" className="btnlogin py-1 px-5 mr-10">
            Login
          </Link>
          <button className="btnlogout py-1 px-4">
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;