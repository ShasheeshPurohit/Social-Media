import "./UserCard.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { followFriend, loadFriends, unfollowFriend } from "../../features/Friends/OtherUserSlice";
import { useEffect } from "react";

export default function UserCard({user}){

    let {status} = useSelector((state)=>state.postsData)
    const {following} = useSelector((state)=>state.friendsData)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(following)
    

    return (
        <div className="w-full flex flex-col items-center border-2 bg-white border-black rounded-lg">
           <p className="user-card-name" onClick={()=>{
               status="idle"
               navigate(`/profile/${user._id}`)}}>{user.fullName}</p>
            <div className="user-friends flex justify-center mt-2 mb-2">
                <p className="p-2">Followers: {user.followers.length}</p>
                
                <p className="p-2">Following: {user.following.length}</p>
            </div>
            {following.some((item)=>item._id===user._id)?
            <button className="user-follow-btn text-l pl-2 pr-2 pt-1 pb-1 w-20 font-semibold" onClick={()=>{
                console.log(following)
                dispatch(unfollowFriend({friendUserId:user._id}))
            }}>Unfollow</button>:<button className="user-follow-btn text-l pl-2 pr-2 pt-1 pb-1 w-20 font-semibold" onClick={()=>{
                console.log(following)
                dispatch(followFriend({friendUserId:user._id}))
            }}>Follow</button>  
        }
            
        </div>
    );
}