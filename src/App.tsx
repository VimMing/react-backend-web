import { Routes, Route, BrowserRouter } from "react-router-dom";
import Introduce from "@/pages/Intro";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {
  // const naviage: ReturnType<typeof useNavigate> = useNavigate();
  // naviage("/login");
  useEffect(() => {
    console.log("enter app");
    // naviage("/login");
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<Login />}></Route>
        <Route index  element={<Introduce />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
