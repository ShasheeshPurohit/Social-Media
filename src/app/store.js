import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postSlice';
import authReducer from '../features/Auth/authSlice'
import friendsReducer from '../features/Friends/OtherUserSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userData: authReducer,
    postsData: postsReducer,
    friendsData: friendsReducer
  },
});
