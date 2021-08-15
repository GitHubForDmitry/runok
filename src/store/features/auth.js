import { createSlice } from '@reduxjs/toolkit'

export const authUSer = createSlice({
    name: 'auth',
    initialState: {
        password: false
    },
    reducers: {
        checkPassword: ((state, action) => {
            state.password = action.payload;
        }),
    },
})

export const { checkPassword } = authUSer.actions

export default authUSer.reducer
