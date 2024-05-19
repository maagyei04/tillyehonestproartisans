import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    artisanId: '',
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    momoNetwork: '',
    momoNumber: '',
    bank: '',
    bankAccountNumber: '',
    bankBranch: '',
    businessField: '',
    businessLocation: '',
    passportImage: '',
    ghanaCardImage: '',
    policeReportImage: '',
    gaurantorNoteImage: '',
    bio: '',
    status: false,
};

export const artisanSlice = createSlice({
    name: 'artisan',
    initialState,
    reducers: {
        setArtisanId: (state, action) => {
            state.artisanId = action.payload;
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
        setPassportImage: (state, action) => {
            state.passportImage = action.payload;
        },
        setGhanaCardImage: (state, action) => {
            state.ghanaCardImage = action.payload;
        },
        setPoliceReportImage: (state, action) => {
            state.policeReportImage = action.payload;
        },
        setGaurantorNoteImage: (state, action) => {
            state.gaurantorNoteImage = action.payload;
        },
        setArtisanBio: (state, action) => {
            state.bio = action.payload;
        },
    },
});

export const {
    setArtisanId,
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
    setGaurantorNoteImage,
    setGhanaCardImage,
    setPassportImage,
    setPoliceReportImage,
    setArtisanBio
} = artisanSlice.actions;

export default artisanSlice.reducer;
