import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState:[],
    reducers: {

        setProductInitial: (state, action) => {
            return [ ...action.payload];
        },

        setProducts: (state, action) => {
            return [...state, ...action.payload];
        },

    },
});

export const { setProducts,setProductInitial} = productSlice.actions;
export default productSlice.reducer;
