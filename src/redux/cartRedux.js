import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        clearCart: () => [],
        setCart: (state, action) => action.payload
    }
});

export const {  clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;