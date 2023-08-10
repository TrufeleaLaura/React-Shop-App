import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartRedux';
import productsReducer from '../redux/productsRedux';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
    }
});

export default store;
