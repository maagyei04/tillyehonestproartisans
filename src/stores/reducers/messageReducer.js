import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userType: 'visitor',
    firstName: '',
    lastName: '',
    email: '',
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
        setMessageEmail: (state, action) => {
            state.email = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const {
    setMessageFirstName,
    setMessageLastName,
    setMessageEmail,
    setMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
