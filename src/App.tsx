import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./app/components/Home/Home";
import Login from "./app/components/Login/Login";
import Post from "./app/components/Posts/Post";
import EditForm from "./app/components/Posts/EditForm";
import CreateForm from "./app/components/Posts/CreateForm";
import Signup from "./app/components/Signup/Signup";
import RequireAuth from "./app/components/RequireAuth/RequireAuth";
import Header from "./app/components/Header/Header";
import { useLocation } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("/login") &&
        !location.pathname.includes("/signup") && <Header />}
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
        <Route
          path="/posts/:postId"
          element={
            <RequireAuth>
              <Post />
            </RequireAuth>
          }
        />
        <Route
          path="/create-post"
          element={
            <RequireAuth>
              <CreateForm />
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:postId"
          element={
            <RequireAuth>
              <EditForm />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
