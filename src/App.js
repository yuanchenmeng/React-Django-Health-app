import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Footer} from './components';
import Home from "./Home";
import Sleep from "./sleep";
import Signup from "./signup";
import Login from "./login";
import Weight from "./weight";
import Calorie from "./Calorie";
import Walking from "./Walking";
import {Navbar} from "./components";
import './App.css';


const App = () => {
  useEffect(() => {
    localStorage.setItem('user', '0');
  }, []);


  return (
    <div>
    <BrowserRouter>
      <div className="">
        <div style={{ paddingTop: '64px' }}>
          <Navbar />
          <div style={{ minHeight: 'calc(100vh - 64px)', width: '100%' }}>
            {/* Subtracting the navbar height from 100vh ensures the content takes remaining space */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sleep" element={<Sleep />} />
              <Route path="/weight" element={<Weight />} />
              <Route path="/calorie" element={<Calorie />} />
              <Route path="/walking" element={<Walking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
};

export default App;

//<div className="flex relative dark:bg-main-dark-bg">
