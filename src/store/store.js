import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartRedux';
import productsReducer from '../redux/productsRedux';
import {apiRedux} from "../redux/apiRedux";
import {productsApiRedux} from "../redux/dummyApiRedux";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        [apiRedux.reducerPath]: apiRedux.reducer,
        [productsApiRedux.reducerPath]: productsApiRedux.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiRedux.middleware).concat(productsApiRedux.middleware)
});

export default store;
