import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type AuthState = {
  userId: number | null;
  token: string | null;
  expiry?: string | null;
};

const createInitialState = (): AuthState => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    try {
      return JSON.parse(storedToken) as AuthState; // normally you might zod to validate this
    } catch {
      console.error("Failed to parse stored token.");
    }
  }
  return { userId: null, token: null, expiry: null };
};

const slice = createSlice({
  name: "auth",
  initialState: createInitialState() as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        userId: number;
        token: string;
        expiry: string;
      }>,
    ) => {
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.userId = action.payload.userId;
      state.expiry = action.payload.expiry;
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectUser = (state: RootState) => state.auth.userId;
