import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../../api/baseurl";




export const loadPosts = createAsyncThunk(
  "posts/load",
  async (param, thunkApi) => {
    try {
      const response = await axios.get(`${baseurl}/feed`);
  
      return (response.data.feedData);
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/add",
  async ({ text }, thunkApi) => {
    try {

      const response = await axios.post(`${baseurl}/post/new`, { text });
      console.log(response.data.newPost);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const likePost = createAsyncThunk(
  "posts/like",
  async ({postId}, thunkApi) => {
    try {
      const response = await axios.post(`${baseurl}/post/like/${postId}`, {});
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const unlikePost = createAsyncThunk(
  "posts/unlike",
  async ({postId}, thunkApi) => {
    try {
      const response = await axios.post(`${baseurl}/post/unlike/${postId}`, {});
      return response;
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const commentPost = createAsyncThunk(
  "posts/comment",
  async ({postId, comment}, thunkApi) => {
    console.log("commented!!!!!")
    try {
      const response = await axios.post(`${baseurl}/post/comment/${postId}`, {comment});
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const loadOtherUser = createAsyncThunk(
  "posts/loadOtherUser",
  async (userId, thunkApi) => {
    try {
      const response = await axios.get(`${baseurl}/user/otherUser/${userId}`);
      console.log(response.data);
      return (response.data.otherUserdata);
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const loadTimeline = createAsyncThunk(
  'auth/loadTimeline',
  async({userId}, thunkApi) => {
      try{
          const response = await axios.get(`${baseurl}/timeline/${userId}`)
          if(response.status === 200){
          return (response.data.feedData)
      }
      }catch(error){
          console.log("failed")
          return thunkApi.rejectWithValue(error.response.data)
      }
  }
)

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    commentStatus:"idle",
    error: null,
    otherUser:null,
    timeline: []

  },
  reducers: {
  },
  extraReducers: {
    [loadPosts.pending] : (state)=>{
      state.status="loading"
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    },

    [addPost.fulfilled]: (state, action) => {

      state.posts.unshift(action.payload.data.newPost)
      console.log(state.posts)
      state.status="success"
    },

    [likePost.fulfilled]: (state, action) => {
      console.log(action.payload.data.userId)
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.data.postId
        
      );
    
      
      state.posts[postIndex].likes.push(action.payload.data.userId)
      
      
    },
    [unlikePost.fulfilled]: (state, action) => {
      console.log("unliking")
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.data.postId
        
      );
      state.posts[postIndex].likes = state.posts[postIndex].likes.filter((item)=>item!==action.payload.data.userId)
      
    },

    [commentPost.fulfilled] : (state, action) => {
        console.log(action.payload)
        const postIndex = state.posts.findIndex(
            (post) => post._id === action.payload.postId
          );


        console.log(action.payload)
        // console.log(state.posts[postIndex])
        state.posts[postIndex].comments.push(action.payload);
        // state.tempComment = action.payload.commentsData

    },
    [loadOtherUser.fulfilled]: (state, action) => {
      state.otherUser = action.payload
    },

    [loadTimeline.pending]:(state)=>{
      state.timelineStatus="loading"
    },

    [loadTimeline.fulfilled]:(state, action)=>{
      state.timelineStatus="success"
      state.timeline = action.payload 
  }
  },
});

export const {likeButtonPressed} = postSlice.actions
export default postSlice.reducer;
