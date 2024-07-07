import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Logout, setUser } from "../features/user/UserSlice";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: "https://flower-management-server-a6-tan.vercel.app",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.data?.statusCode === 404) {
    return toast.error("not FOund");
  }

  if (result?.error?.data?.message?.matchAll("Coupon is not Varyfaid")) {
    return toast.error(result?.error?.data?.message);
  }
  if (result?.error?.statusCode === 406) {
    return toast.error("not FOund");
  }
  if (result?.error?.statusCode === 403) {
    return toast.error("SomeThing Wrong");
  }

  if (
    result?.error?.data?.statusCode === 401 ||
    result?.error?.data?.message === "jwt expired"
  ) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch(
      "https://flower-management-server-a6-tan.vercel.app/user/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).user.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(Logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["getUser", "getFlower", "getMe", "getUserWithAdmin"],
  endpoints: () => ({}),
});
