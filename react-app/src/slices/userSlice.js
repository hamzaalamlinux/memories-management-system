
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        loading: false,
        error : null,
        isAuthenticated: false,
    },
    reducers:{
       setUser : (state, action) => {
        const user = action.payload;
        state.user = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            photoURL: user.photoURL,
            providerData: user.providerData,
            // Add other relevant fields here
          };
          state.isAuthenticated = true
       },
       logout : (state) => {
            state.user = null;
            state.isAuthenticated = false
            // persistor.purge();
       },
    },
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

