import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./pages.css";


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = () => {
    axios({
      method: "POST",
      url: "/users/",
      data: {
        Username: email,
        Password: password,
        mypara: "signup",
      }
    }).catch(error => console.log(error));
    navigate('/login');
  };

  return (
    <div className="h-screen bg-cover bg-center  bg-[url('./res/bkg1.png')]">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-5">

        <div className="signupsize bg-cover bg-contain flex flex-col bg-[url('./res/SL.png')]">
          <h2 className="mb-4 mt-4 self-center sigupf">Sign Up</h2>

          <input
            type="text"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-4/5 mt-8 mx-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-4/5 mt-16  mx-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={handleSignUp}
            className="mt-12 px-10 py-2 mb-4 self-center mybtnb1s"
          >
            Sign Up
          </button>
        </div>


      </div>

    </div>
  );
};
export default Signup

//         <div className="w-2/5 ">
//           <img src={sidlog} alt="Sample" className="h-full"/>
//         </div>