import { createBrowserRouter, redirect } from "react-router-dom";
import NonAuthLayout from "../components/layout/(Non-Auth)/NonAuthLayout";
import Login from "../pages/(Non-Auth)/Login";
import Register from "../pages/(Non-Auth)/Register";
import VerifyEmail from "../pages/(Non-Auth)/VerifyEmail";
import NotFound from "../components/common/NotFound";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/auth/login");
  }

  return null;
}

function preventAuthAccess() {
  if (localStorage.access_token) {
    return redirect("/");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <NonAuthLayout />,
    loader: preventAuthAccess,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/auth/register",
    loader: preventAuthAccess,
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/",
    loader: checkLogin,
    element: <div>Protected Home Page</div>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
