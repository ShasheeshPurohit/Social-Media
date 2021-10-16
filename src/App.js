import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Routes , Route} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import Friends from './Pages/Friends/Friends';
import SearchPage from './Pages/SearchPage/SearchPage'; 
import {PrivateRoute} from "./PrivateRoute/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="app-screen flex justify-center">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <PrivateRoute path="/feed" element={<Feed/>}/>
        <PrivateRoute path="/profile/:userId" element={<Profile/>}/>
        <PrivateRoute path="/friends" element={<Friends/>}/>
        <PrivateRoute path="/search" element={<SearchPage/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
