import {
  createSelector,
  createEntityAdapter,
  type EntityState,
} from "@reduxjs/toolkit";

import { api } from "@/app/services/apiSlice";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

const postsAdapter = createEntityAdapter<Post>();
const initialState = postsAdapter.getInitialState();

// export const apiSliceWithPosts = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getPosts: builder.query<EntityState<Post, number>, void>({
//       query: () => "/admin/posts",
//       transformResponse(res: Post[]) {
//         console.log("Transforming response for posts:", res);
//         return postsAdapter.setAll(initialState, res);
//       },
//     }),
//   }),
// });
//
// export const { useGetPostsQuery } = apiSliceWithPosts;
//
// export const selectPostsResult = apiSliceWithPosts.endpoints.getPosts.select();
// const selectPostsData = createSelector(
//   selectPostsResult,
//   (result) => result.data ?? initialState,
// );
//
// export const { selectAll: selectAllPosts, selectById: selectPostById } =
//   postsAdapter.getSelectors(selectPostsData);
