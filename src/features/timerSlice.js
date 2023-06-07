import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session: 25,
    breakT: 5,
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {

    }
});

//export const {} = timerSlice.actions;
export default timerSlice.reducer;