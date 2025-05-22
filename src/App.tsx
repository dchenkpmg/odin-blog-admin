import { BrowserRouter, Routes, Route } from "react-router";
// import { Navbar } from "./app/components/Navbar/Navbar";
import Home from "./app/components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="app">
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
