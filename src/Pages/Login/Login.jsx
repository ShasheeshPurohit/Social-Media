import "./Login.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginBox from "../../features/Auth/Login/Login";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";


export default function Login(){

    const token = useSelector((state)=>state.userData.token)
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            navigate("/feed")
        }
      }, [token, navigate]) 
 

    return(
        <div className="login-layout relative h-full flex w-screen justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
            <LoginBox/>
        </div>
    );
}   