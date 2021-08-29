import { createSlice } from '@reduxjs/toolkit'
import firebase from "../../firebase";
export const authUSer = createSlice({
    name: 'auth',
    initialState: {
        password: false,
        currentUser: null
    },
    reducers: {
        checkPassword: ((state, action) => {
            state.password = action.payload;
        }),
        getCurrentUser: ((state, action) => {
            state.currentUser = firebase.auth().onAuthStateChanged()
        }),
    },
})

export const { checkPassword } = authUSer.actions

export default authUSer.reducer
