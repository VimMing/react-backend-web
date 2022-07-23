import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import Introduce from "@/pages/Intro";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "@/features/user/userSlice";

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
        <Route path="/login" element={<Login />}></Route>
        <Route
          index
          element={
            <RequireAuth>
              <Introduce />
            </RequireAuth>
          }></Route>
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAppSelector(selectAuth);
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
