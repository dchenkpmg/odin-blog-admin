import { Navigate } from "react-router";
import { useProtectedQuery } from "@/app/services/apiSlice";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useProtectedQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data?.status === "success" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RequireAuth;
