import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userType: 'visitor',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    message: '',
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setMessageLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setMessagePhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const {
    setMessageFirstName,
    setMessageLastName,
    setMessagePhoneNumber,
    setMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
