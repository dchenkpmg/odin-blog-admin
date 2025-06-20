import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

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

type Author = {
  username: string;
};

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  published: boolean;
}

export type NewPost = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "author"
> & {
  userId?: number;
};

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}
export type NewComment = Omit<
  Comment,
  "id" | "createdAt" | "updatedAt" | "author"
> & {
  postId: number;
  userId?: number;
};

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
  tagTypes: ["Post", "Comment"],
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
      query: () => "admin/protected",
    }),
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),
    addPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<Post, { post: NewPost; id: number }>({
      query: ({ post, id }) => ({
        url: `/edit/${id}`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    changePostStatus: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/post-status/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    getComments: builder.query<Comment[], number>({
      query: (id) => `/posts/${id}/comments`,
      providesTags: ["Comment"],
    }),
    postComment: builder.mutation<
      Comment,
      { postId: number; newComment: NewComment }
    >({
      query: ({ postId, newComment }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useProtectedQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useGetCommentsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useChangePostStatusMutation,
  usePostCommentMutation,
  useDeleteCommentMutation,
} = api;
