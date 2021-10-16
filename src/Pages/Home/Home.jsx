import "./Home.css"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"
import { useEffect } from "react"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userLogin } from "../../features/Auth/authSlice"

export default function Home(){

    const {token} = useSelector((state)=>state.userData)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(token){
            navigate("/feed")
        }
      }, [token, navigate]) 

    return(
        <div className="home-layout h-full w-screen flex justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="welcome-box border-2 bg-white rounded-lg h-80 w-80 bg-opacity-80 flex flex-col items-center justify-around">
                <p className="welcome-heading text-5xl">Hey there!, <br/>welcome to beehive.</p>
                <div className="home-button-section flex justify-around w-full">
                <Link to="/login" className="home-btn p-1 bg-black active:scale-90 text-lg rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase">Login</Link>
                <button  className="home-btn p-1 bg-black active:scale-90 text-s rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase" onClick={()=>dispatch(userLogin({userName:"shasheesh", password:"shasheesh1234"}))}>Login as Guest</button>
                <Link to="/signup" className="home-btn p-1 bg-black active:scale-90 text-lg rounded-lg border-solid border-4 border-transparent font-bold text-white hover:bg-white hover:text-black hover:border-black uppercase">Signup</Link>
                </div>
                
            </div>
        </div>
    );
}