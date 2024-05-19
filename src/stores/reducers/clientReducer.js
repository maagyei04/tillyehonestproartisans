import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clientId: '',
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    profilePic: '',
    momoNetwork: '',
    momoNumber: '',
    bank: '',
    bankAccountNumber: '',
    bankBranch: '',
    businessField: '',
    businessLocation: '',
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClientId: (state, action) => {
            state.clientId = action.payload;
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setMomoNetwork: (state, action) => {
            state.momoNetwork = action.payload;
        },
        setMomoNumber: (state, action) => {
            state.momoNumber = action.payload;
        },
        setBank: (state, action) => {
            state.bank = action.payload;
        },
        setBankAccountNumber: (state, action) => {
            state.bankAccountNumber = action.payload;
        },
        setBankBranch: (state, action) => {
            state.bankBranch = action.payload;
        },
        setBusinessField: (state, action) => {
            state.businessField = action.payload;
        },
        setBusinessLocation: (state, action) => {
            state.businessLocation = action.payload;
        },
        setProfilePic: (state, action) => {
            state.profilePic = action.payload;
        }
    },
});

export const {
    setClientId,
    setUserType,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setMomoNetwork,
    setMomoNumber,
    setBank,
    setBankAccountNumber,
    setBankBranch,
    setBusinessField,
    setBusinessLocation,
    setProfilePic
} = clientSlice.actions;

export default clientSlice.reducer;
