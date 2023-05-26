import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {Inject, SparklineComponent, SparklineTooltip} from "@syncfusion/ej2-react-charts";
import sidlog from './res/SL.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failure, setfailure] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    axios({
      method: "POST",
      url: "/users/",
      data: {
        Username: email,
        Password: password,
        mypara: "login",
      }
    }).then(response => {
      console.log("LOGGED IN");
      GetUserID();
      navigate("/home");
    }).catch(error => {
      console.log(error, email, password);
      setfailure(true);
    });
  };


  const GetUserID = () => {
    axios({
      method: "POST",
      url: "/users/",
      data: {
        Username: email,
        Password: password,
        mypara: "getID",
      }
    }).then(response => {
      localStorage.setItem('user', JSON.stringify(response.data['UserID']));
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <div className="h-screen bg-cover bg-center  bg-[url('./res/bkg1.png')]">

      <div className="bg-transparent mx-auto text-center h-16">
      </div>
      <div className="w-2/5 pt-2 flex flex-col mx-auto py-10 loginpad">
        <h2 className="text-2xl font-bold py-3 mb-4 mt-4 self-center">Login </h2>

        <input
          type="text"
          value={email}
          placeholder="Enter Your Username/Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-4/5 mt-6 mx-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-4/5 mt-10  mx-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Link to="/signup" className="mt-4 text-blue-500 self-center">
          Don't have an account? Sign Up Here
        </Link>

        <button
          type="button"
          onClick={handleLogin}
          className="mt-6 px-12 py-2 mb-6 self-center mybtnb1s"
        >
          Login
        </button>

        {failure && (
          <div className="mb-4 text-red-400 mx-auto text-center">
            Login Failed, Please check you entered right password
          </div>
        )}


      </div>

    </div>

  );
};
export default Login;






