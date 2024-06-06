import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tweetsReducer from '../features/tweets/tweetsSlice';
import usersReducer from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
