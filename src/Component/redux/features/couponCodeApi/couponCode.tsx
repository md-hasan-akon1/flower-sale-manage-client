import { TQueryParam } from "../../../types/Globale";
import { baseApi } from "../../api/baseApi";

const couponCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCouponCode: builder.mutation({
      query: (coupon) => ({
        url: "/coupon/createCoupon",
        method: "POST",
        body: coupon,
      }),
    }),
    getAllCouponCode: builder.query({
      query: () => ({
        url: "/coupon/getAllCoupon",
        method: "GET",
      }),
    }),
    getSingleCouponCode: builder.query({
      query: (args) => {
        const param = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            param.append(item.name, item.value as string);
          });
        }
        return {
          url: "/coupon/getSingleCoupon",
          method: "GET",
          params: param,
        };
      },
    }),
  }),
});

export const {
  useCreateCouponCodeMutation,
  useGetAllCouponCodeQuery,
  useGetSingleCouponCodeQuery,
} = couponCodeApi;
