import "./Navbar.css"
import { Link } from "react-router-dom";
import { clearData } from "../../features/Auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar(){

    const token = useSelector((state)=>state.userData.token)
    const state = useSelector((state)=>state.userData);
    let {status} = useSelector((state)=>state.postsData)
    const dispatch = useDispatch()


    return(
        <nav className="navbar w-screen flex bg-black text-white h-16 justify-center">
            {token?<div className="flex">
            <Link to="/feed"><p className="uppercase text-2xl ml-6 mr-6"><i class="fas fa-home"></i></p></Link>
            <Link to={`/profile/${state.currentUser._id}`}><p onClick={()=>{
                status="idle"
            }} className="uppercase text-2xl ml-6 mr-6"><i class="fas fa-user"></i></p></Link>
            <Link to="/friends"><p className="uppercase text-2xl ml-6 mr-6"><i class="fas fa-users"></i></p></Link>
            <Link to="/search"><p className="uppercase text-2xl ml-6 mr-6"><i class="fas fa-search"></i></p></Link>
            <p className="logout-btn uppercase text-2xl ml-6 mr-6" onClick={()=>dispatch(clearData())}><i class="fas fa-sign-out-alt"></i></p>
            </div>:
            <div className="nav-brand">
            <Link to="/"><p className="uppercase text-2xl">beehive</p></Link>
        </div>
            }
            
            
        </nav>
    );
}

