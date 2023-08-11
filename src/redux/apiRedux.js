import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const ID_CART = "64c77ddd8e88f";

export const apiRedux = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart'}),
    endpoints: builder => ({
        getCart: builder.query({
            query: (token) => ({
                url: `/${ID_CART}`,
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${token}`}
            })
        }),
        updateCart: builder.mutation({
            query: ({token,product}) => ({
                url: `/${ID_CART}`,
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${token}`},
                body: JSON.stringify({products:product})
            }),
            }),
        removeFromCart: builder.mutation({
            query: ({token,productId}) => ({
                url: `/${ID_CART}?products[]=${productId}`,
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${token}`},
            }),
            }),
        })
    })


export const {useGetCartQuery,useUpdateCartMutation,useRemoveFromCartMutation} = apiRedux