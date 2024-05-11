import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookingData: null,
    error: null,
}

export const bookingInfoSlice = createSlice({
    name: 'bookingInfo',
    initialState,
    reducers: {
        setBookingInfo: (state, action) => {
            state.bookingData = action.payload;
        },
    },
})

export const {
    setBookingInfo,
} = bookingInfoSlice.actions;

export default bookingInfoSlice.reducer