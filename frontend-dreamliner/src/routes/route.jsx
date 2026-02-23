import { createBrowserRouter, redirect } from "react-router-dom";
import NonAuthLayout from "../components/layout/(Non-Auth)/NonAuthLayout";
import Login from "../pages/(Non-Auth)/Login";
import Register from "../pages/(Non-Auth)/Register";
import VerifyEmail from "../pages/(Non-Auth)/VerifyEmail";
import NotFound from "../components/common/NotFound";
import Profile from "../pages/(Auth)/Profile";
import { publicAPI } from "../api/axiosInstance";

async function checkUsername({ params }) {
  const { username } = params;

  let res = await publicAPI.get(`users`)
}

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
    children: [
      {
        path: "",
        element: <h1>Home Page</h1>,
      },
      {
        path: "settings",
        element: <h1>Settings Page</h1>,
      },
      {
        path: ":username",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
