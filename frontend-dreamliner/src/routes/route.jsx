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
import MyFeed from "../pages/(Auth)/MyFeed";
import LoadingSkeleton from "../components/skeleton/LoadingSkeleton";
import Explore from "../pages/(Auth)/Explore";
import Story from "../pages/(Auth)/Story";

async function checkUsername({ params }) {
  try {
    const { username } = params;

    let res = await publicAPI.get(`users/find/${username}`);
    console.log(res, "Res checkUsername");

    if (!res.data.success) {
      throw new Response("User not found", { status: 404 });
    }

    return res.data.data;
  } catch (error) {
    console.log(error, "error apa");

    if (error.response?.status === 404) {
      throw new Response("User not found", { status: 404 });
    }

    throw new Response("Server error", { status: 500 });
  }
}
async function checkPostId({ params }) {
  try {
    const { PostId } = params;
    let res = await publicAPI.get(`posts/find/${PostId}`);

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

async function storyLoader({ params }) {
  try {
    const { username } = params;
    let res = await publicAPI.get(`stories/user/${username}`);

    if (!res.data.success) {
      throw new Response("Story not found", { status: 404 });
    }

    return res.data.data.rows;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Response("Story not found", { status: 404 });
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
        path: "explore",
        element: <Explore />,
      },

      {
        path: ":username",
        element: <Profile />,
        loader: checkUsername,
      },
    ],
  },
  {
    path: "/stories/:username/:StoryId",
    element: <Story />,
    loader: storyLoader,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingSkeleton />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

// {
//     "success": true,
//     "data": {
//         "count": 2,
//         "rows": [
//             {
//                 "id": 10,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/06/ea/1a/06ea1aaa289e1a573dabff2c0607e6fb.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-17T13:32:39.917Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-16T13:32:39.916Z",
//                 "updatedAt": "2026-03-16T13:32:39.916Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "Replies": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 9,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/26/c2/ee/26c2eeb065f7e3d1f709071971940359.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-17T13:32:05.800Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-16T13:32:05.785Z",
//                 "updatedAt": "2026-03-16T13:32:05.785Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "Replies": [],
//                 "hasViewed": false
//             }
//         ]
//     },
//     "message": "Get story by username success"
// }
