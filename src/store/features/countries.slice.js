import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        data: [],
    },
    reducers: {
        setCountries: (state, action) => {
            state.data = action.payload
        },
    }
})

export default countriesSlice.reducer;
export const { setCountries } = countriesSlice.actions