import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clientData: null,
    error: null,
}

export const clientInfoSlice = createSlice({
    name: 'clientInfo',
    initialState,
    reducers: {
        setClientData: (state, action) => {
            state.clientData = action.payload;
        },
    },
})

export const {
    setClientData,
} = clientInfoSlice.actions;

export default clientInfoSlice.reducer
