import "./PostCreateBox.css"
import { useState } from "react";
import { addPost } from "../../features/posts/postSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function PostCreateBox(){

    const dispatch = useDispatch();
    const [postMessage, setPostMessage] = useState("");
    const {status} = useSelector((state)=>state.postsData)

    return(
        <div className="post-create-box flex flex-col bg-white p-2 rounded-lg w-full items-center" >
            <textarea type="text" className="post-create-box-textbox border-gray-400 w-full border-2 text-m p-2 rounded-lg " value={postMessage}  placeholder="What's on your mind?" onChange={(event)=>setPostMessage(event.target.value)}>  
            </textarea>
            <button className="post-create-btn text-xs m-2 rounded-lg uppercase"onClick={()=>{
                if(postMessage){
                dispatch(addPost({text:postMessage}))
                setPostMessage("")}
                }            
            }>{status==="pending"?"Loading":"Post"}</button>
        </div>
    );
}