import {setProducts,setProductInitial} from './productsRedux';

export const fetchInitialProducts = () => async (dispatch) => {
    try {
        console.log('fetching initial products')
        const response = await fetch('https://dummyjson.com/products/?limit=9');
        const data = await response.json();
        dispatch(setProductInitial(data.products));
    } catch (error) {
        console.error('Error fetching initial products:', error);
    }
};

