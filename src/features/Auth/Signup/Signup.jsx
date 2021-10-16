import "./Signup.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {userLogin, userSignup} from "../authSlice"

export default function SignupBox(){

    const [fullName, setName] = useState("");
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const state = useSelector((state)=>state.userData)

    const dispatch = useDispatch();

  useEffect(() => {
    if(state.signup === "true"){
      dispatch(userLogin({userName, password}))
    }
  }, [state, dispatch])



    return(
        
            <div className="signup-box border-2 pt-4 w-96 pb-4 pr-8 pl-8 rounded-lg flex flex-col justify-center">
                    <p className="text-4xl text-bold uppercase mb-4 text-white">Sign up</p>
                    <input className="signup-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
                    <input className="signup-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Username" onChange={(event)=>setUsername(event.target.value)}/>
                    <input className="signup-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Email" type="email" onChange={(event)=>setEmail(event.target.value)}/>
                    <input className="signup-field mt-4 mb-4 ml-2 mr-2 w-full p-2 hover:bg-grey-100" placeholder="Password" type="password" onChange={(event)=>setPassword(event.target.value)}/>
            <button className="signup-btn p-2 bg-white w-1/2 text-l rounded-lg border-solid border-2 border-transparent font-bold text-black hover:bg-purple-700 hover:text-white hover:border-white uppercase" onClick={()=>dispatch(userSignup({fullName:fullName, email:email, userName:userName, password:password}))}>Sign up</button>

            </div>

    );
}