import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApiRedux = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: builder => ({
        getAnotherProducts: builder.query({
            query: ({ productsAlreadyInPage }) => `/products?limit=9&skip=${productsAlreadyInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images,discountedPrice`,
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
        }),
    })
});

export const { useGetAnotherProductsQuery,useGetProductQuery } = productsApiRedux;
