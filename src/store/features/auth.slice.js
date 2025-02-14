import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined,
        token: undefined,
        temporaryUserId: undefined
    },
    reducers: {
        initUser: (state, action) => {
            state.user = action.payload
        },
        initToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            for(let index in action.payload) {
                state.user[index] = action.payload[index];
            }
        },
        setTemporaryUserId: (state, action) => {
            state.temporaryUserId = action.payload
        },
        deleteIndex: (state, action) => {
            delete(state.user[action.payload]);
        },
        deleteUser: (state) => {
            state.user = undefined;
        },
        deleteToken: (state) => {
            state.token = undefined
        },
        resetAuth: (state) => {
            state.user = undefined;
            state.token = undefined;
            state.temporaryUserId = undefined;
        }
    }
})

export default authSlice.reducer;
export const { initUser, initToken, deleteIndex, deleteUser, deleteToken, resetAuth, setTemporaryUserId } = authSlice.actions