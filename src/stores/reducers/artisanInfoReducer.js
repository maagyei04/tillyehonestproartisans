import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    artisanData: null,
    error: null,
}

export const artisanInfoSlice = createSlice({
    name: 'clientInfo',
    initialState,
    reducers: {
        setArtisanData: (state, action) => {
            state.artisanData = action.payload;
        },
    },
})

export const {
    setArtisanData,
} = artisanInfoSlice.actions;

export default artisanInfoSlice.reducer
