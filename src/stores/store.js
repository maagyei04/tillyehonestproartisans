import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterReducer'
import clientReducer from './reducers/clientReducer'
import clientInfoReducer from './reducers/clientInfoReducer'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        client: clientReducer,
        clientInfo: clientInfoReducer,
    },
})