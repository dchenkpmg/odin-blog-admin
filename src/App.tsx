import { BrowserRouter, Routes, Route } from "react-router";
// import { Navbar } from "./app/components/Navbar/Navbar";
import Home from "./app/components/Home/Home";
import Login from "./app/components/Login/Login";
import Signup from "./app/components/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
