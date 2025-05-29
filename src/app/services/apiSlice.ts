import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface User {
  id: string;
  name: string;
}

export interface UserResponse {
  userId: number;
  token: string;
  expiry: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.query<{ message: string; status: string }, void>({
      query: () => ({
        url: "admin/protected",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useProtectedQuery } = api;
