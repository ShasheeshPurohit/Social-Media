import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadAllUsers } from "../../features/Friends/OtherUserSlice";
import { setupAuthHeaderForServiceCalls } from "../../features/Auth/util";
import UserCard from "../../Components/Cards/UserCard";

export default function SearchPage(){

    const {allUsers, status} = useSelector((state)=>state.friendsData)
    const dispatch = useDispatch();
    const state = useSelector((state)=>state.userData);

    useEffect(()=>{
        setupAuthHeaderForServiceCalls(state.token);
        if(status==="idle"){
        dispatch(loadAllUsers("param"));   
        } 
    },[dispatch])

    return(
        <div className="search-layout pt-8 flex flex-col items-center w-full h-full mb-16">
            <input className="search-box-users w-4/5 rounded-lg p-2 border-2 border-gray-400" placeholder="Search..."></input>
            <div className="user-display mt-8 flex  w-full flex-wrap justify-center">
              
                    {status==="success" && allUsers?.slice(0,5).map((user)=>{
                        return(
                            <div className="m-4 w-60">
                                <UserCard user={user}/>
                            </div>
                        );
                    })}
                
            </div>
        </div>
    );
}