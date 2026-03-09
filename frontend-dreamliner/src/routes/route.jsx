import { createBrowserRouter, redirect } from "react-router-dom";
import NonAuthLayout from "../components/layout/(Non-Auth)/NonAuthLayout";
import Login from "../pages/(Non-Auth)/Login";
import Register from "../pages/(Non-Auth)/Register";
import VerifyEmail from "../pages/(Non-Auth)/VerifyEmail";
import NotFound from "../components/common/NotFound";
import Profile from "../pages/(Auth)/Profile";
import { publicAPI } from "../api/axiosInstance";
import ProfileLayout from "../components/layout/(Non-Auth)/ProfileLayout";
import PostModalFeed from "../components/common/post/PostModalFeed";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import MyFeed from "../pages/(Auth)/MyFeed";

async function checkUsername({ params }) {
  try {
    const { username } = params;

    let res = await publicAPI.get(`users/find/${username}`);

    if (!res.data.success) {
      throw new Response("User not found", { status: 404 });
    }

    return res.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Response("User not found", { status: 404 });
    }

    throw new Response("Server error", { status: 500 });
  }
}
async function checkPostId({ params }) {
  try {
    const { PostId } = params;
    let res = await publicAPI.get(`posts/${PostId}`);

    if (!res.data.data.postData) {
      throw new Response("Post not found", { status: 404 });
    }

    return res.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Response("Post not found", { status: 404 });
    }
    throw new Response("Server error", { status: 500 });
  }
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
    element: <ProfileLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingSkeleton />,
    children: [
      {
        index: true,
        element: <MyFeed />,
      },
      {
        path: "p/:PostId",
        element: <PostModalFeed />,
        loader: checkPostId,
      },
      {
        path: ":username",
        element: <Profile />,
        loader: checkUsername,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
