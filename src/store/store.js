import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartRedux';
import productsReducer from '../redux/productsRedux';
import {apiRedux} from "../redux/apiRedux";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        [apiRedux.reducerPath]: apiRedux.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiRedux.middleware)
});

export default store;
