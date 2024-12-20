import {createSlice} from "@reduxjs/toolkit"

const memoriesSlice = createSlice({
    name : "memories",
    initialState : {
        memories : [],
        loading:false,
        error : null,
    },
    reducers : {
        setMemories : (state, action) => {
            state.memories = action.payload;
        },
        addMemories : (state, action) => {
            state.memories.push(action.payload);
        },
        startLoading : (state) => {
            state.loading = true;
        },
        stopLoading:(state) => {
            state.loading = false;
        },
        setError: (state, action)  => {
            state.error = action.payload;
        }
    }
})

export const  {setMemories, addMemories, startLoading, stopLoading, setError} = memoriesSlice.actions;
export default memoriesSlice.reducer;
