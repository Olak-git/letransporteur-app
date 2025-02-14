import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

// import storage from 'redux-persist/lib/storage';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import initReducer from '../features/init.slice';
import authReducer from '../features/auth.slice';
import countriesReducer from '../features/countries.slice';

const createNoopStorage = () => {
   return {
      getItem(_key) {
         return Promise.resolve(null);
      },
      setItem(_key, value) {
         return Promise.resolve(value);
      },
      removeItem(_key) {
         return Promise.resolve();
      },
   };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['user']
}

const reducers = combineReducers({
   init: initReducer,
   auth: authReducer,
   countries: countriesReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV != 'production',
    middleware: [thunk]
})

export default store
