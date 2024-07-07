export type TSaleData = {
  _id: string;
  buyerName: string;
  quantity: number;
  saleDate: Date;
  price: number;
  sellerName: string;
  buyerUserName: string;
};
export type TAllUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isMember:boolean;
  __v: number;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
