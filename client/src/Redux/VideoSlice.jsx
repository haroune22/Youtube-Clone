// eslint-disable-next-line no-unused-vars
import { createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line no-unused-vars
const initialState = {
 Video:null,
  loading:false,
  error:false,
}
export const VideoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
     fetchStart:(state)=>{
        state.loading=true;
      
     },
     fetchSuccess:(state,action)=>{
        state.Video=action.payload;
        state.loading=false;
      
     },
     fetchFailure:(state)=>{
        state.loading=false;
        state.error=true;
      
     },
     like: (state, action) => {
      if (!state.Video.likes.includes(action.payload)) {
        state.Video.likes.push(action.payload);
        state.Video.dislikes.splice(
          state.Video.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.Video.dislikes.includes(action.payload)) {
        state.Video.dislikes.push(action.payload);
        state.Video.likes.splice(
          state.Video.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});
  
// eslint-disable-next-line react-refresh/only-export-components
export const { fetchFailure,fetchStart,fetchSuccess,like,dislike } = VideoSlice.actions
  
  export default VideoSlice.reducer