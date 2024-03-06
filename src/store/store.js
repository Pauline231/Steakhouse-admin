import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import orderReducer from '../features/orderSlice'
import userReducer from '../features/userSlice'
import productReducer from '../features/productSlice'


export const store = configureStore({
    reducer:{
        auth : authReducer,
        order : orderReducer,
        users : userReducer,
        products : productReducer,
       
    },
})