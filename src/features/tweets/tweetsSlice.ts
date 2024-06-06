import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Tweet {
  id: number;
  content: string;
  userId: number;
  sharedWith: number[];
}

interface TweetsState {
  tweets: Tweet[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetsState = {
  tweets: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const fetchTweets = createAsyncThunk('tweets/fetchTweets', async () => {
  const response = await axios.post(`${API_BASE_URL}/tweets`);
  return response.data;
});

export const createTweet = createAsyncThunk('tweets/createTweet', async (tweetData: { content: string; users: number[] }) => {
    const response = await axios.post('/tweets', tweetData);
    return response.data;
  });  

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.push(action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default tweetsSlice.reducer;
