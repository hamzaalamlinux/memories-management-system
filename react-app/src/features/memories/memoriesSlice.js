import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memoriesService from "./memoriesService";

export const addMemories = createAsyncThunk(`api/memories/store`, async(request ,thunkAPI) => {
    try{
        return await memoriesService.addMemories(request);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || 'Something Went Wrong');
    }
})

export const updateMemories = createAsyncThunk(`api/memories/update-memories`, async(request, thunkAPI)=> {
    try{
    return await memoriesService.updatememories(request);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || 'Something Went Wrong');
    }
})


export const fetchMemories = createAsyncThunk(`api/memories/reterive-memories`, async(thunkAPI) => {
    try{
       
        return await memoriesService.fetchMemories();
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || 'Something Went Wrong');
    }
})

export const deleteMemory = createAsyncThunk(`api/memories/delete-memories/`, async (Id, thunkAPI) => {
    try{
       return await memoriesService.deleteMemories(Id);
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data || 'Something Went Wrong');
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
            state.memories.push(action?.payload?.data);
            state.status = action.payload.data.status;
            state.message = action.payload.data.message;
        })
        .addCase(addMemories.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload.data.status;
            state.error = action.payload.data.message;
        })
        .addCase(fetchMemories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMemories.fulfilled, (state, action) => {
            state.memories = action?.payload?.data;
            state.loading = false;
            state.message = action.payload?.data?.message;
            state.error  = null;
        })
        .addCase(fetchMemories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.data?.message;
        })
        .addCase(updateMemories.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateMemories.fulfilled, (state, action) => {
            const updatedMemory = action.payload?.data;
            state.loading = false;
            state.memories = state.memories.map(memory =>
                memory.id === updatedMemory.id ? updatedMemory : memory
            );
            state.status = action.payload.data.status;
            state.message = action.payload.message;
            state.error = null;
        })
        .addCase(updateMemories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.data?.message;
        })
        .addCase(deleteMemory.pending,(state)=> {
            state.loading = true;
        })
        .addCase(deleteMemory.fulfilled, (state, action) => {
            state.loading = false;
            const deleteId = action.payload?.data?.deletedId;
            state.message = action.payload?.data?.message;
            console.log(state.message);
            state.error = null;
            state.memories = state.memories.filter(
                (memory) => memory.id != deleteId
            );
            // state.status = action.payload.status;
            

        })
        .addCase(deleteMemory.rejected, (state, action) => {
           state.loading = false;
            state.error = action.payload?.data?.message;
        })
    }
})

export const {resetError} = memoriesSlice.actions;
export default memoriesSlice.reducer;