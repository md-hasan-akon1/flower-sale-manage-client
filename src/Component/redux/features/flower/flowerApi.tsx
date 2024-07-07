import { baseApi } from "../../api/baseApi";
const flowerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (userInfo) => {
       return{ url: "/product/create-product",
       method: "POST",
       body: userInfo,}
      },
      invalidatesTags:['getFlower']
    }),
    getFlower: builder.query({
      query: () => ({
        url: "/product/getall-product",
        method: "GET",
      }),
      providesTags:['getFlower']
    }),
    getSingleFlower: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET",
        params: id,
      }),
    }),
    deleteFlower:builder.mutation({
      query:(data)=>({
        url:'/product/delete-product',
        method:'DELETE',
        body:data
      }),
      invalidatesTags:['getFlower']
    }),
    updateFlower: builder.mutation({
      query: (updateData) => {
        const { id, data } = updateData;
        return {
          url: `/product/update-product/${id}`,
          method: "PUT",
          params: id,
          body: data,
        };
      },
      invalidatesTags:['getFlower']
    }),
  }),
});
export const {
  useCreateProductMutation,
  useGetFlowerQuery,
  useGetSingleFlowerQuery,
  useUpdateFlowerMutation,
  useDeleteFlowerMutation
} = flowerApi;
