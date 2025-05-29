import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./app/components/Home/Home";
import Login from "./app/components/Login/Login";
import Signup from "./app/components/Signup/Signup";
import RequireAuth from "./app/components/RequireAuth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
