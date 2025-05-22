import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

const initialState: Post[] = [
  {
    id: "1",
    title: "First Post",
    content: "This is the content of the first post",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: "Alice",
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is the content of the second post",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: "Bob",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
