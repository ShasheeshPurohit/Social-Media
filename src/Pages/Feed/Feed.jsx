import FeedPost from "../../Components/FeedPost/FeedPost";
import PostCreateBox from "../../Components/PostCreateBox/PostCreateBox";
import "./Feed.css"
import { useEffect, useState } from "react";
import { loadAllUsers, loadFriends } from "../../features/Friends/OtherUserSlice";
import { loadPosts } from "../../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { setupAuthHeaderForServiceCalls } from "../../features/Auth/util";
import ClipLoader from "react-spinners/ClipLoader";
import { HashLoader, MoonLoader } from "react-spinners";

export default function Feed(){

    const state = useSelector((state)=>state.userData);
    // const allUsers = useSelector((state)=>state.friendsData.allUsers);
    setupAuthHeaderForServiceCalls(state.token)
    const postState = useSelector((state)=>state.postsData)
    // const friends = useSelector((state)=> state.friendsData)
    const dispatch = useDispatch();


    useEffect(() => {
        setupAuthHeaderForServiceCalls(state.token);
        
        if(postState.status==="idle"){
            dispatch(loadPosts("param"))
        }
        dispatch(loadFriends("param"))
        
      }, [postState.status]);

    //   console.log(postState.posts)
    // let sortedPosts = postState?.posts?.sort((a,b)=>b.createdAt-a.createdAt)


    return (
    
        <div className="feed-layout flex justify-around h-full w-3/4 justify-center">
            <div className="feed-display flex w-3/5 flex-col items-center pr-2 pl-2">
                <PostCreateBox/>
                {postState.status==="loading" && <div className="mt-16"><HashLoader color={"purple"} size={50}/></div>}
                {postState.status==="success" && 
                <ul className="feed-post-display flex flex-col w-full items-center pt-8">
                {postState.posts.map((post)=>{
                    return(
                        <li className="w-full"><FeedPost post={post}/></li>
                    );
                })
                }
             </ul>
                }
            </div> 
        </div>
    );
}