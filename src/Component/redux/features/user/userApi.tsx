import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registration: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["getUser"],
    }),
    getAllUserWithAdmin: builder.query({
      query: () => ({
        url: "/user/user-with-admin",
        method: "GET",
      }),
      providesTags: ["getUserWithAdmin"],
    }),
    getMe: builder.query({
      query: (args) => ({
        url: `/user/${args}`,
        method: "GET",
      }),
      providesTags: ["getMe"],
    }),
    UpdateRole: builder.mutation({
      query: (data) => ({
        url: "/user/updateRole",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getUser"],
    }),

    getMember: builder.mutation({
      query: (data) => ({
        url: "/user/getMember",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getMe",'getUserWithAdmin'],
    }),
  }),
});
export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useGetMemberMutation,
  useGetMeQuery,
  useGetAllUserWithAdminQuery,
} = userApi;
