import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memoriesService from "./memoriesService";

export const addMemories = createAsyncThunk(`api/memories/store`, async(request ,thunkAPI) => {
    try{
        return await memoriesService.addMemories(request);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || 'Something Went Wrong');
    }
})


export const fetchMemories = createAsyncThunk(`api/memories/reterive-memories`, async(thunkAPI) => {
    try{
        console.log("ok");
        return await memoriesService.fetchMemories();
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || 'Something Went Wrong');
    }
})

const memoriesSlice = createSlice({
    name : "memories",
    initialState : {
        loading : false,
        memories : [],
        message : '',
        status : false,
        error : null 
    },
    reducers : {
        resetError : (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addMemories.pending, (state) => {
            state.loading = true;
        })
        .addCase(addMemories.fulfilled, (state, action) => {
            state.loading = false;
            state.memories = action.payload?.data;
            state.status = action.payload.status;
            state.message = action.payload.message;
        })
        .addCase(addMemories.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
            state.error = action.payload.message;
        })
        .addCase(fetchMemories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMemories.fulfilled, (state, action) => {
            state.memories = action.payload?.data;
            state.loading = false;
            state.message = action.payload?.message;
            state.error  = null;
        })
        .addCase(fetchMemories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
    }
})

export const {resetError} = memoriesSlice.actions;
export default memoriesSlice.reducer;