
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

export const login  = createAsyncThunk(`/api/login`, async(credentials, thunkAPI) => {
    try{
        return await userService.login(credentials);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data  || 'Something Went Wrong.');
    }
})
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
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
         state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.isAuthenticated = true;
            state.loading = false;
            
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;

