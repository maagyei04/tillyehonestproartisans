import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookingServiceDetail: '',
    bookingStartDate: '',
    bookingStartTime: '',
    bookingDigitalAddress: '',
    bookingHouseNumber: '',
    bookingTown: '',
    bookingRegion: '',
    bookingCountry: '',
    bookingCommunity: '',
    bookingLandmark: '',
    bookingLocationInfo: '',
    bookingEmail: '',
    bookingPhoneNumber: '',
    bookingClientId: '',
    bookingArtisanId: '',
    bookingPayment: '',
    bookingStatusArtisan: '',
    bookingStatusClient: '',
    bookingEstimateAmount: 0,
    bookingApproved: false,
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingServiceDetail: (state, action) => {
            state.bookingServiceDetail = action.payload;
        },
        setBookingStartDate: (state, action) => {
            state.bookingStartDate = action.payload;
        },
        setBookingStartTime: (state, action) => {
            state.bookingStartTime = action.payload;
        },
        setBookingDigitalAddress: (state, action) => {
            state.bookingDigitalAddress = action.payload;
        },
        setBookingHouseNumber: (state, action) => {
            state.bookingHouseNumber = action.payload;
        },
        setBookingTown: (state, action) => {
            state.bookingTown = action.payload;
        },
        setBookingRegion: (state, action) => {
            state.bookingRegion = action.payload;
        },
        setBookingCountry: (state, action) => {
            state.bookingCountry = action.payload;
        },
        setBookingCommunity: (state, action) => {
            state.bookingCommunity = action.payload;
        },
        setBookinglandmark: (state, action) => {
            state.bookingLandmark = action.payload;
        },
        setBookingLocationInfo: (state, action) => {
            state.bookingLocationInfo = action.payload;
        },
        setBookingEmail: (state, action) => {
            state.bookingEmail = action.payload;
        },
        setBookingPhoneNumber: (state, action) => {
            state.bookingPhoneNumber = action.payload;
        },
        setBookingClientId: (state, action) => {
            state.bookingClientId = action.payload;
        },
        setBookingArtisanId: (state, action) => {
            state.bookingArtisanId = action.payload;
        },
    },
});

export const {
    setBookingArtisanId,
    setBookingClientId,
    setBookingCommunity,
    setBookingCountry,
    setBookingDigitalAddress,
    setBookingEmail,
    setBookingHouseNumber,
    setBookingLocationInfo,
    setBookingPhoneNumber,
    setBookingRegion,
    setBookingServiceDetail,
    setBookingStartDate,
    setBookingStartTime,
    setBookingTown,
    setBookinglandmark,
} = bookingSlice.actions;

export default bookingSlice.reducer;