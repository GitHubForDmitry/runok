import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./features/counterSlice";
import checkUser from "./features/auth";
export default configureStore({
    reducer: {
        counter: counterSlice,
        checkUser,
    },
})
