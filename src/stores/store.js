import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterReducer'
import clientReducer from './reducers/clientReducer'
import clientInfoReducer from './reducers/clientInfoReducer'
import artisanReducer from './reducers/artisanReducer'
import artisanInfoReducer from './reducers/artisanInfoReducer'
import bookingReducer from './reducers/bookingReducer'
import bookingInfoReducer from './reducers/bookingInfoReducer'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        client: clientReducer,
        clientInfo: clientInfoReducer,
        artisan: artisanReducer,
        artisanInfo: artisanInfoReducer,
        booking: bookingReducer,
        bookingInfo: bookingInfoReducer,
    },
})