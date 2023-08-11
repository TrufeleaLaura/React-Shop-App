import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState:[],
    reducers: {
        setProducts: (state, action) => {
           return [...state,...action.payload];
        },
    },
});

export const { setProducts} = productSlice.actions;
export default productSlice.reducer;
