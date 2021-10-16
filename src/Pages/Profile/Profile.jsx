import "./Profile.css"
import { useEffect, useState } from "react"
import profile from "../../assets/profile.png"
import PostCreateBox from "../../Components/PostCreateBox/PostCreateBox"
import FeedPost from "../../Components/FeedPost/FeedPost"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadTimeline } from "../../features/Auth/authSlice"
import { loadFriends } from "../../features/Friends/OtherUserSlice"
import { setupAuthHeaderForServiceCalls } from "../../features/Auth/util"
import { HashLoader } from "react-spinners"
import { loadPosts } from "../../features/posts/postSlice"

export default function Profile(){

    const {userId} = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state)=>state.userData)
    const {followers, following, allUsers} = useSelector((state)=>state.friendsData)
    const postState = useSelector((state)=>state.postsData)
    const [timeline, setTimeline] = useState([]);
    


    useEffect(()=>{
        setupAuthHeaderForServiceCalls(state.token)
        dispatch(loadFriends("param"))
        if(postState.status==="idle"){
            dispatch(loadPosts("param"))
        }
    },[dispatch])

    

    return(
        <div className="profile-layout flex flex-col w-1/2 h-full items-center">
            <div className="user-details w-full flex flex-col items-center pt-8">
                <div className="image-container h-40 w-40">
                    <img src={profile} className="profile-picture-placeholder h-full w-full bg-gray-500 rounded-full"/>
                </div>
                <div className="user-bio w-10/12 bg-gray-100 h-20 mt-8 mb-8 text-justify border-2 border-gray-400 rounded-lg p-2">
                     <p>Hey there! follow me to see my posts</p>
                </div>
                <div className="post-display-profile w-full p-2 rounded-lg">
                    <PostCreateBox/>
                    <ul className="user-feed-profile flex-col w-full min-height-80 items-center mt-4 flex-col">
                        {(postState.posts.map((post)=>{
                                if(post.author===userId){
                                return(
                                    <li className="w-full"><FeedPost post={post}/></li>
                                );
                                }
                            }))}
                    </ul>
                </div>
            </div>
        </div>
    );
}