import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderStatus: 'pending',
    paymentMethod: '',
    paymentDate: '',
    sellerId: '',
    review: '',
    rate: '',
    approved: true,
    buyerName: '',
    buyerPhone: '',
    dateOrdered: new Date(),
    items: [
        {
            productName: '',
            quantity: 0,
            price: 0,
        },
    ],
    totalAmount: 0,
    totalQuantity: 0,
    paymentStatus: 'Not Paid',
    deliveryOption: '',
    buyerLocation: '',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrderStatus: (state, action) => {
            state.orderStatus = action.payload;
        },
        updatePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        updatePaymentDate: (state, action) => {
            state.paymentDate = action.payload;
        },
        updateSellerId: (state, action) => {
            state.sellerId = action.payload;
        },
        updateReview: (state, action) => {
            state.review = action.payload;
        },
        updateRate: (state, action) => {
            state.rate = action.payload;
        },
        updateApproved: (state, action) => {
            state.approved = action.payload;
        },
        updateBuyerName: (state, action) => {
            state.buyerName = action.payload;
        },
        updateBuyerPhone: (state, action) => {
            state.buyerPhone = action.payload;
        },
        updateDateOrdered: (state, action) => {
            state.dateOrdered = action.payload;
        },
        updateItems: (state, action) => {
            state.items = action.payload;
        },
        updateTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
        },
        updateTotalQuantity: (state, action) => {
            state.totalQuantity = action.payload;
        },
        updatePaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        updateDeliveryOption: (state, action) => {
            state.deliveryOption = action.payload;
        },
        updateBuyerLocation: (state, action) => {
            state.buyerLocation = action.payload;
        },
    },
});

export const {
    updateOrderStatus,
    updatePaymentMethod,
    updatePaymentDate,
    updateSellerId,
    updateReview,
    updateRate,
    updateApproved,
    updateBuyerName,
    updateBuyerPhone,
    updateDateOrdered,
    updateItems,
    updateTotalAmount,
    updateTotalQuantity,
    updatePaymentStatus,
    updateDeliveryOption,
    updateBuyerLocation,
} = orderSlice.actions;

export default orderSlice.reducer;