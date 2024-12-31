
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

export const login  = createAsyncThunk(`/api/login`, async(credentials, thunkAPI) => {
    try{
        return await userService.login(credentials);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data  || 'Something Went Wrong.');
    }
})

export const register = createAsyncThunk(`api/register`, async(credentials, thunkAPI) => {
    try{
            return await userService.register(credentials);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data ||  `Something went wrong`);
    }
})

export const googleLogin = createAsyncThunk(`api/socialLogin`, async(credentials, thunkAPI) => {
    try{
      return await userService.socialLogin(credentials);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || `Something went wrong`)
    }
});
const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        loading: false,
        error : null,
        isAuthenticated: false,
    },
    reducers:{
       logout : (state) => {
            state.user = null;
            state.isAuthenticated = false
            // persistor.purge();
       },
       resetError: (state) =>  {
            state.error = null;
       }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
         state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(register.pending, (state) => {
            state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload?.data;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        })
        .addCase(googleLogin.pending, (state) => {
            state.loading = true;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload?.data;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
    }
})

export const { logout, resetError} = userSlice.actions;
export default userSlice.reducer;

