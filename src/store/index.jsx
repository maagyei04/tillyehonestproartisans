import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunk]
});

export default store;
