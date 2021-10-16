import "./Friends.css"
import { useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../../Components/Cards/UserCard";

export default function Friends(){

    const [displayTab, setDisplayTab] = useState("followers")
    const {followers} = useSelector((state)=>state.friendsData)
    const {following} = useSelector((state)=>state.friendsData)


    return (
        <div class="friends-layout pt-2">
            <button className="m-4 pb-2 text-2xl" onClick={()=>setDisplayTab("followers")} style={{borderBottom:displayTab==="followers"?"2px solid purple":"none"}}>followers</button>
            <button className="m-4 pb-2 text-2xl" onClick={()=>setDisplayTab("following")} style={{borderBottom:displayTab==="following"?"2px solid purple":"none"}}>following</button>
            {displayTab==="followers" && <div className="followers-layout flex flex-wrap">
                <ul className="flex flex-wrap">
                    {followers.map((user)=>{
                        return(
                            <li><UserCard user={user}/></li>
                        );
                    })}
                </ul>
            </div>}
            {displayTab==="following" && <div className="following-layout flex flex-wrap">
            <ul className="flex flex-wrap">
                    {following.map((user)=>{
                       return(
                            <li><UserCard user={user}/></li>
                        );
                    })}
                </ul>
            </div>}
        </div>
    );
}