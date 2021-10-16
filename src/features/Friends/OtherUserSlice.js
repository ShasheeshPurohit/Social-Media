import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseurl } from "../../api/baseurl";
import axios from 'axios'

export const loadAllUsers = createAsyncThunk('friendsManagement/loadAll',
async (param, { fulfillWithValue, rejectWithValue }) => {
    try {
  
        const response = await axios.get(`${baseurl}/user`);
        // console.log(response.data);
        return fulfillWithValue(response.data.allUsers);
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
}
)
export const loadFriends = createAsyncThunk('friendsManagement/load',
async (param, { fulfillWithValue, rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseurl}/friends`);
        return fulfillWithValue(response.data);
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
}
)
export const followFriend = createAsyncThunk('friendsManagement/follow',
async ({friendUserId}, thunkApi) => {
    try {
        console.log("follow triggered")
        
        const response = await axios.post(`${baseurl}/friends/follow/${friendUserId}`, {});
        console.log(response.data)
        return (response.data);
      } catch (error) {
        console.log(error.response.data);
        return thunkApi.rejectWithValue(error.response.data);
      }
}
)
export const unfollowFriend = createAsyncThunk('friendsManagement/unfollow',
async ({friendUserId}, thunkApi) => {
    try {
      console.log("Unfollow triggered");
        const response = await axios.post(`${baseurl}/friends/unfollow/${friendUserId}`, {});
        console.log(response)
        return (response.data);
      } catch (error) {
        console.log(error.response.data);
        return thunkApi.rejectWithValue(error.response.data);
      }
}
)
const userDetails = {
  userName: null,
  fullname: null,
  email: null,
  bio: null,
  dob: null,
  gender: null,
  profilePic: null    
}

const otherUsersInitialstate = {
  userDetails:userDetails,
  posts:null,
  followers:null,
  following:null,
  allusers:null
} 

const friendsManagementSlice = createSlice({
    name:'friendsManagement',
    initialState:{
        followers:[],
        following:[],
        allUsers:null,
        status: "idle"
    },
    reducers:{

    }, 
    extraReducers:{
      [loadFriends.fulfilled] : (state, action) => {
        state.followers = action.payload.followers
        state.following = action.payload.following
      },
      [followFriend.fulfilled] : (state, action) => {
        console.log(action.payload.followers)
        state.following = action.payload.following
        const friendUser = state.allUsers.filter((user)=>user._id===action.payload.friendUserId)
        friendUser[0].followers = action.payload.followers
      },
      [unfollowFriend.fulfilled] : (state, action) => {
        state.following = action.payload.following
         const friendUser = state.allUsers.filter((user)=>user._id===action.payload.friendUserId)
        friendUser[0].followers = action.payload.followers
      },

      [loadAllUsers.pending]: (state)=>{
        state.status="loading"
      },

      [loadAllUsers.fulfilled] : (state, action) => {
        state.allUsers = action.payload
        state.status="success"
      }
    }
})

export default friendsManagementSlice.reducer;