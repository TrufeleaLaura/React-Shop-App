import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {useAuth} from "../components/AuthComponent";
const ID_CART = "64c77ddd8e88f";


export const apiRedux = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/cart/'}),
    endpoints: builder => ({
        getCart: builder.query({
            query: (user) => ({
                url: `/${user._id}`,
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`}
            })
        }),
        updateCart: builder.mutation({
            query: ({user,product}) => ({
                url: `/${user._id}`,
                method: 'PUT',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
                body: JSON.stringify(product)
            }),
            }),
        removeFromCart: builder.mutation({
            query: ({user,productId}) => ({
                url: `/${user._id}/${productId}`,
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
            }),
            }),

        removeAllFromCart: builder.mutation({
            query: ({token,productId}) => ({
                url: `/${ID_CART}`,
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Internship-Auth': `${token}`},
            }),
        }),
    })
})


export const {useGetCartQuery,useUpdateCartMutation,useRemoveFromCartMutation,useRemoveAllFromCartMutation} = apiRedux