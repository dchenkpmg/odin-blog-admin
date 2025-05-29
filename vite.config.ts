import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  define: {
    "process.env.VITE_APP_API_URL": JSON.stringify(
      process.env.VITE_APP_API_URL,
    ),
  },
});
