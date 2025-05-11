import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../Service/postService';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    data: [], // Store the processedData array here
    error: null,
    message: '', // Store the message here
  },
  reducers: {
    // Add a reducer to handle setting messages manually
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Store the processedData array
        state.message = action.payload.message; // Store the message
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the setMessage action
export const { setMessage } = postSlice.actions;

export default postSlice.reducer;