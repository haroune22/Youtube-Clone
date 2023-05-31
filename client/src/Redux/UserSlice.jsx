/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line no-unused-vars
const initialState = {
  currentUser:null,
  loading:false,
  error:false,
}
export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     LoginStart:(state)=>{
        state.loading=true;
      
     },
     LoginSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
      
     },
     LoginFailure:(state)=>{
        state.loading=false;
        state.error=true;
      
     },
     logout:(state)=>{
         state.currentUser=null;
         state.loading=false;
        state.error=false;
     },
     subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});
  
 
  // eslint-disable-next-line react-refresh/only-export-components
  export const { LoginFailure,LoginStart,LoginSuccess,logout ,subscription} = UserSlice.actions
  
  export default UserSlice.reducer