import "./Signup.css"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import SignupBox from "../../features/Auth/Signup/Signup";

export default function Signup(){
    const state = useSelector((state)=>state.userData);
    const navigate = useNavigate();

    useEffect(() => {
        if(state.token){
            navigate("/feed")
        }
    }, [state, navigate])







    return(
        <div className="signup-layout relative h-full flex w-screen justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
            <SignupBox/>
        </div>
    );
}