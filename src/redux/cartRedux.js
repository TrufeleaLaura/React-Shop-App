import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.find(item => item.id === action.payload.id);

            if (!existingProduct) {
                state.push({ ...action.payload, quantity: 1 });
            } else {
                existingProduct.quantity += 1;
            }
        },
        removeFromCart: (state, action) => {
            const existingProduct = state.find(item => item.id === action.payload);

            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    return state.filter(item => item.id !== action.payload);
                }
            }
        },
        clearCart: () => [],
        setCart: (state, action) => action.payload
    }
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
