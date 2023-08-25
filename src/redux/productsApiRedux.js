import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApiRedux = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/products/' }),
    endpoints: builder => ({
        getAnotherProducts: builder.query({
            query: ({ nextProductsNumber, productsInPage }) => ({
                method: 'POST',
                body: {
                    nextProductsNumber,
                    productsInPage,
                },
            }),
        }),
    })
});

export const { useGetAnotherProductsQuery,useGetProductQuery } = productsApiRedux;
