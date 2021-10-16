import { useSelector, useDispatch } from "react-redux";
import "./createPost.css"
import { useState, useEffect } from "react";
import bee from "../../../images/bee.png";
import { addPost, loadPosts } from "../postSlice";
import { loadFeed } from "../../Auth/authSlice";

export default function CreatePost(){

    const [text, setText] = useState("")
    const dispatch = useDispatch()


    return(
        <div className="post-box">
            <input className="post-input" type="text" value={text} placeholder="What's buzzin?..." onChange={(event)=>setText(event.target.value)}/>
            <button className="post-create-btn" onClick={async()=>{
                setText("")
                await dispatch(addPost({text: text}))
                
                dispatch(loadFeed("param"))
                }}>buzz</button>
            
        </div>
    );
}