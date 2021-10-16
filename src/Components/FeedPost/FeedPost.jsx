import { useEffect, useState } from "react";
import {commentPost, likeButtonPressed, likePost, unlikePost} from "../../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import "./FeedPost.css"

export default function FeedPost({post}){

    const dispatch = useDispatch();
    const [comments, setComments] = useState(false);
    const [comment, setComment] = useState("")
    const state = useSelector((state)=>state.userData)
    // const [commentArr, setCommentArr] = useState([])

    

    const commentArr = post?.comments
    const flagLength = post?.likes?.filter((item)=>item===state.currentUser._id)


    return(
        <div>
            {post===undefined?<HashLoader color={"purple"} size={50}/>:(
                <div className="feed-post-box p-2  mt-1 mb-1 rounded-lg">
                <div className="bg-gray-100 mb-1 p-2 rounded-lg">
                <div className="post-details flex pl-2 pb-2">
                    <p><i class="far fa-user"></i> {post.authorName}</p>
                </div>
                <div className="post-message-box text-justify mt-2 pl-2 pr-2 border-b-2 pb-2 border-gray-400">
                    <p>{post.text}</p>
                </div>
                <div className="post-controls flex justify-around">
                    <div className="w-1/2 "> 
                    
                    {flagLength.length>0?
    
                    <button onClick={()=>{
                 
                      dispatch(unlikePost({
                        postId: post._id
                    }))
                    
                    }}><i style={{color:"red"}} class="mr-1 fas fa-heart"></i></button>
    
                    :
                    
                    <button onClick={()=>{

                        dispatch(likePost({
                          postId: post._id
                      }))
                      
                      }}><i class="mr-1 far fa-heart"></i></button>
                    }
                    {post.likes.length === 0? "" : post.likes.length}</div>


                    <div className="w-1/2"><button  onClick={()=>setComments(!comments)}><i class="far fa-comment"></i></button></div>
                    
                    
                </div>
                </div>
                <div className="comment-section bg-gray-100  rounded-lg " style={{display: comments?"initial":"none"}}>
                    <ul  className="comments flex flex-col bg-gray-100  rounded-lg text-justify">
                        {commentArr?.map((comment)=>{
                            return(
                                comment?
                                <li className="comment text-sm m-1 bg-gray-200  rounded-lg p-2"><div>
                            <p  className="pl-2 pb-1"><i class="far fa-user mr-2"></i>{comment.fullName}</p>
                            <p className="p-2">{comment.comment}</p>
                            </div></li>:""
                                
                                
                            );
                        })}
                    </ul>
                    <div className="w-full flex p-1">
                    <input className="comment-input w-4/5 bg-white rounded-lg p-1 mt-1 " placeholder="Enter a comment" onChange={(event)=>setComment(event.target.value)} value={comment}></input> <button className="comment-post-btn w-1/5 text-white mt-1" onClick={()=>{
                        if(comment){
                            dispatch(commentPost({
                            postId:post._id,
                            comment:comment
                        }))
                        setComment("")}
                        }}><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}