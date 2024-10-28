import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ApiService = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000",
        // baseUrl:"https://contact.sankyitar.store/api/v1",
        // baseUrl:"https://contact-app.mmsdev.site/api/v1",
        // prepareHeaders:(headers, {getState})=>{
        //     const token = localStorage.getItem("token_email");

        //     if (token){
        //         headers.set("authorization", `Bearer ${JSON.parse(token)}`);
        //     }

        //     return headers;
        // }
    }),
    tagTypes:["/contact","/auth"],
    endpoints:(builder) => ({})
})