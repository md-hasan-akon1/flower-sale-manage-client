import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/sale/create-sale",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags:['getMe','getUser','getUserWithAdmin']
    }),
    getSales: builder.query({
      query: (userInfo) => {
        return {
          url: "sale/filter-sale",
          method: "GET",
          params: userInfo,
        };
      },
    }),
    getBuyData: builder.query({
      query: (userInfo) => {
        return {
          url: `/buy-history/${userInfo}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useCreateSaleMutation, useGetSalesQuery, useGetBuyDataQuery } =
  saleApi;
