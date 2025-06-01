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

export interface SignupResponse {
  status: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  confirmPassword: string;
  adminCode: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  username: string;
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
    register: builder.mutation<SignupResponse, SignupRequest>({
      query: (newUser) => ({
        url: "admin/register",
        method: "POST",
        body: newUser,
      }),
    }),
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
    getPosts: builder.query<Post[], void>({
      query: () => "admin/posts",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useProtectedQuery,
  useGetPostsQuery,
} = api;
