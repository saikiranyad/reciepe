// redux/Slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authslice = createSlice({
  name: "user",
  initialState: {
    user: null,
   
    loading: false, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      
      state.loading = false;
     
    },
    clearUser: (state) => {
      state.user = null;
      
      state.loading = false;
     
    },
   
  },
});

export const { setUser, clearUser, setLoading } = authslice.actions;
export default authslice.reducer;
