import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
// import Introduce from "@/pages/Intro";
import Layout from "@/features/layout/layout";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectAuth, autoLogin } from "@/features/user/userSlice";
import { getToken } from "@/utils/token";
import { connect } from "react-redux";
import {RootState} from "@/app/store"
function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log("enter app");
    dispatch(autoLogin())
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          index
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }></Route>
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }></Route>
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAppSelector(selectAuth);
  let location = useLocation();
  if (!(auth || getToken().Authorization)) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
// const ConnectedRequireAuth = connect((state:RootState) => {
//   return {
//     auth: state.user.Authorization
//   }
// })(RequireAuth)

export default App;
