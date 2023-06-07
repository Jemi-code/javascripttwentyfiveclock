import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./timerSlice";

export const store = configureStore({
    reducer: {
        timer: timerSlice,
    },
})