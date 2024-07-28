import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    OrderProductName: '',
    OrderDate: new Date().toISOString(),
    OrderQuantity: 0,
    OrderPrice: 0,
    OrderTotalPrice: 0,
    OrderStatus: 'pending',
    OrderPaymentMethod: '',
    OrderPaymentStatus: 'pending',
    OrderPaymentReference: '',
    OrderPaymentDate: '',
    OrderBuyerLocationInfo: '',
    OrderBuyerName: '',
    OrderBuyerPhoneNumber: '',
    OrderSellerId: '',
    OrderReview: '',
    OrderRate: '',
    OrderDeliveryOption: '',
    OrderApproved: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderProductName: (state, action) => {
            state.OrderProductName = action.payload;
        },
        setOrderDate: (state, action) => {
            state.OrderDate = action.payload;
        },
        setOrderQuantity: (state, action) => {
            state.bookingStartTime = action.payload;
        },
        setOrderPrice: (state, action) => {
            state.OrderPrice = action.payload;
        },
        setOrderTotalPrice: (state, action) => {
            state.OrderTotalPrice = action.payload;
        },
        setOrderStatus: (state, action) => {
            state.OrderStatus = action.payload;
        },
        setOrderPaymentMethod: (state, action) => {
            state.OrderPaymentMethod = action.payload;
        },
        setOrderPaymentStatus: (state, action) => {
            state.OrderPaymentStatus = action.payload;
        },
        setOrderPaymentReference: (state, action) => {
            state.OrderPaymentReference = action.payload;
        },
        setOrderPaymentDate: (state, action) => {
            state.OrderPaymentDate = action.payload;
        },
        setOrderBuyerLocationInfo: (state, action) => {
            state.OrderBuyerLocationInfo = action.payload;
        },
        setOrderBuyerName: (state, action) => {
            state.OrderBuyerName = action.payload;
        },
        setOrderBuyerPhoneNumber: (state, action) => {
            state.OrderBuyerPhoneNumber = action.payload;
        },
        setOrderSellerId: (state, action) => {
            state.OrderSellerId = action.payload;
        },
        setOrderReview: (state, action) => {
            state.OrderReview = action.payload;
        },
        setOrderRate: (state, action) => {
            state.OrderRate = action.payload;
        },
        setOrderApproved: (state, action) => {
            state.OrderApproved = action.payload;
        },
        setOrderDeliveryOption: (state, action) => {
            state.OrderDeliveryOption = action.payload;
        },
    },
});

export const {
    setOrderProductName,
    setOrderDate,
    setOrderQuantity,
    setOrderPrice,
    setOrderTotalPrice,
    setOrderStatus,
    setOrderPaymentMethod,
    setOrderPaymentStatus,
    setOrderPaymentReference,
    setOrderPaymentDate,
    setOrderBuyerLocationInfo,
    setOrderBuyerName,
    setOrderBuyerPhoneNumber,
    setOrderSellerId,
    setOrderReview,
    setOrderRate,
    setOrderApproved,
    setOrderDeliveryOption,
} = orderSlice.actions;

export default orderSlice.reducer;