import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterReducer'
import clientReducer from './reducers/clientReducer'
import clientInfoReducer from './reducers/clientInfoReducer'
import artisanReducer from './reducers/artisanReducer'
import artisanInfoReducer from './reducers/artisanInfoReducer'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        client: clientReducer,
        clientInfo: clientInfoReducer,
        artisan: artisanReducer,
        artisanInfo: artisanInfoReducer,
    },
})