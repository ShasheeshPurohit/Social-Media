import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../authSlice";
import "./Login.css"

export default function LoginBox(){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const state = useSelector(state => state.userData)

    const dispatch = useDispatch();

    useEffect(() => {
        if(state.token){
          dispatch(userLogin({userName, password}))
          console.log("triggered")
        }

      }, [state, dispatch])



    return(
        <div className="login-box border-2 pt-4 w-96 pb-4 pr-8 pl-8 rounded-lg flex flex-col justify-center">
                    <p className="text-4xl text-bold uppercase mb-4 text-white">Login</p>
            
                    <input className="login-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Username" onChange={(event)=>setUserName(event.target.value)}/>
            
                    <input type="password" className="login-field mt-4 mb-4 ml-2 mr-2 w-full p-2 hover:bg-grey-100" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} />
            <button className="login-btn p-2 bg-white w-1/2 text-l rounded-lg border-solid border-2 border-transparent font-bold text-black hover:bg-purple-700 hover:text-white hover:border-white uppercase" onClick={()=>dispatch(userLogin({userName, password}))}>Login</button>

            </div>
    );
}