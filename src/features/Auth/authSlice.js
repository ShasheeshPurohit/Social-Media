import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../api/baseurl';
import { setupAuthHeaderForServiceCalls, setLocalStorage, clearLocalStorage, getUserFromLocalStorage } from './util';
import { getTokenFromLocalStorage } from './util';


export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
        console.log("trigger login thunk")
      const response = await axios.post(`${baseurl}/user/login`, {
        userName,
        password,
      });
      // console.log(response.data)
      if (response.status === 200) {
        setupAuthHeaderForServiceCalls(response.data.token);
        setLocalStorage(response.data.user, response.data.token);
      }
      return fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const userSignup = createAsyncThunk(
    'auth/signup',
    async ({fullName, userName, email, password}, {fulfillWithValue, rejectWithValue}) => {
        try{
            console.log("yahaa aagaya bhai")
            const response = await axios.post(`${baseurl}/user/signup`, {fullName, userName, email, password})
            console.log(response.status)

            return fulfillWithValue(response.data)
        }catch(error){
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const userEdit = createAsyncThunk(
    'auth/edit',
    async (updatedDetails, {fulfillWithValue, rejectWithValue}) => {
        try{
            const response = await axios.post(`${baseurl}/user/edit`, updatedDetails)
            if(response.status === 200){
                clearLocalStorage();
                setupAuthHeaderForServiceCalls(response.data.token);
                setLocalStorage(response.data.user, response.data.token);
            }
            return fulfillWithValue(response.data)
        }catch(error){
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const clearNotif = createAsyncThunk(
    'auth/clearnotif',
    async (param, {fulfillWithValue, rejectWithValue}) => {
        try{
            const response = await axios.delete(`${baseurl}/notifications/clear`)
            if(response.status === 200){
                clearLocalStorage();
                setupAuthHeaderForServiceCalls(response.data.token);
                setLocalStorage(response.data.user, response.data.token);
            }
            return fulfillWithValue(response.data)
        }catch(error){
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// export const loadFeed = createAsyncThunk(
//     'auth/loadFeed',
//     async(param, {fulfillWithValue, rejectWithValue}) => {
//         try{
//             const response = await axios.get(`${baseurl}/feed`)
//             if(response.status === 200){
//             return fulfillWithValue(response.data.feedData)
//         }
//         }catch(error){
//             console.log(error.response)
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

export const loadTimeline = createAsyncThunk(
    'auth/loadTimeline',
    async({userId}, {fulfillWithValue, rejectWithValue}) => {
        try{
            const response = await axios.get(`${baseurl}/timeline/${userId}`)
            if(response.status === 200){
            return fulfillWithValue(response.data.feedData)
        }
        }catch(error){
            console.log("failed")
            return rejectWithValue(error.response.data)
        }
    }
)

const currentUser = {
    userName: "",
    fullName:"",
    profilePicture:"",
    _id:""
}

const authSlice = createSlice({
    name:"auth",
    initialState: {
        currentUser:getUserFromLocalStorage(),
        token:getTokenFromLocalStorage(),
        loginStatus:"loggedOut",
        error:null,
        signup: "idle",
        userFeed:null,
        timeline: null,
    },
    reducers:{
        setData:(state, action) => {
            state.currentUser = action.payload.userData;
            state.token = action.payload.token
            state.loginStatus = "loggedIn";
        },
        clearData:(state) => {
            state.currentUser = {};
            state.token= null
            state.loginStatus = "loggedOut";
            clearLocalStorage();
        }
    },
    extraReducers:{
        [userLogin.pending]: (state) =>  {
            state.loginStatus = "loggingIn";
        },
        [userLogin.fulfilled]: (state, action) =>  {
            state.signup = "idle"
            state.currentUser = action.payload.user;
            state.currentUser.userId= action.payload.user._id;

            state.token = action.payload.token
            state.loginStatus = "loggedIn";
            
        },
        [userLogin.rejected]: (state) =>  {
            state.loginStatus = "logginFailed";
            
        },

        [userSignup.fulfilled] : (state, action) => {
            state.signup = "true"
        },

        [userEdit.fulfilled] : (state, action) => {
            state.signup = "idle"
            state.currentUser = action.payload.user;
            state.currentUser.userId= action.payload.user._id;

            state.token = action.payload.token
            state.loginStatus = "loggedIn";
        },
        
        [clearNotif.fulfilled] : (state, action) => {
            state.signup = "idle"
            state.currentUser = action.payload.user;
            state.currentUser.userId= action.payload.user._id;

            state.token = action.payload.token
            state.loginStatus = "loggedIn";
        },
        // [loadFeed.fulfilled] : (state, action) => {
        //     state.userFeed = action.payload
        // },
        [loadTimeline.fulfilled]:(state, action)=>{
            state.timeline = action.payload 
        }

    }

})

export const {setData, clearData, notifLoad} = authSlice.actions;
export default authSlice.reducer