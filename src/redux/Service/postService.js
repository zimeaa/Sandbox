// services/postService.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { tracer } from '../../Tracing'; // Import tracer

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  // const span = tracer.startSpan('fetch-posts');
  
  const traceparent = `00-${generateTraceId()}-${generateSpanId()}-01`;
  console.log('Sending traceparent:', traceparent); // Log traceparent for debugging
  
  try {
    const response = await axios.get('http://localhost:3002/posts', {
      headers: {
        traceparent, // Send traceparent header
      },
    });

    return {
      message: response.data.message, // Extract the message
      data: response.data.processedData, // Extract the processedData array
    };
  } catch (error) {
    // span.end();
    return rejectWithValue(error.message);
  }
});

// Helper functions for generating trace ID and span ID
const generateTraceId = () => Math.random().toString(16).substring(2, 18);
const generateSpanId = () => Math.random().toString(16).substring(2, 10);
