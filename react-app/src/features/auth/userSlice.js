
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import axiosInstance, { setupAxiosInterceptors } from "../../api/axiosInstance";

export const login  = createAsyncThunk(`/api/login`, async(credentials, thunkAPI) => {
    try{
        return await userService.login(credentials);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data  || 'Something Went Wrong.');
    }
})

export const refreshToken = createAsyncThunk(`/api/refreshToken`, async(request, thunkAPI) => {
    try{
        return await userService.refreshToken(request);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || 'Somethign went wrong');
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
        status : false,
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
        // for login
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload?.data;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null; 
            state.status = true;           
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        //for register
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

        //for social login
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

        //for refresh token
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false;
            state.user.token = action.payload.data?.token;
        })  
    }
})

export const { logout, resetError} = userSlice.actions;
export default userSlice.reducer;

