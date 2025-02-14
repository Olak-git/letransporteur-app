import { createSlice } from "@reduxjs/toolkit";

export const initSlice = createSlice({
    name: 'init',
    initialState: {
        presentation: false,
        welcome: false,
        theme: 'light',
    },
    reducers: {
        setPresentation: (state, action) => {
            state.presentation = action.payload
        },
        setWelcome: (state, action) => {
            state.welcome = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export default initSlice.reducer;
export const { setPresentation, setWelcome, setTheme } = initSlice.actions