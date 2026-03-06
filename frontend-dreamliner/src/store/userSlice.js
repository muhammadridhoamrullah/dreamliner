import { createSlice } from "@reduxjs/toolkit";
import privateAPI, { publicAPI } from "../api/axiosInstance";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loadingFindUser: false,
    errorFindUser: null,
    dataFindUser: null,
    loadingFollowUser: false,
    errorFollowUser: null,
    dataFollowUser: null,
    loadingUserLogin: false,
    errorUserLogin: null,
    dataUserLogin: null,
  },
  reducers: {
    findByUsernameReq: (state) => {
      state.loadingFindUser = true;
      state.errorFindUser = null;
    },
    findByUsernameSuccess: (state, action) => {
      state.loadingFindUser = false;
      state.dataFindUser = action.payload;
    },
    findByUsernameError: (state, action) => {
      state.loadingFindUser = false;
      state.errorFindUser = action.payload;
    },

    // Follow User
    followUserReq: (state) => {
      state.loadingFollowUser = true;
      state.errorFollowUser = null;
    },
    followUserSuccess: (state, action) => {
      state.loadingFollowUser = false;
      state.dataFollowUser = action.payload;
      if (state.dataFindUser && state.dataUserLogin) {
        const currentUserId = state.dataUserLogin.id;

        if (action.payload.data.isFollowing) {
          state.dataFindUser.Followers.push({
            id: currentUserId,
            username: state.dataUserLogin.username,
            avatar: state.dataUserLogin.avatar,
            isVerified: state.dataUserLogin.isVerified,
          });
        } else {
          state.dataFindUser.Followers = state.dataFindUser.Followers.filter(
            (follower) => follower.id !== currentUserId,
          );
        }
      }
    },
    followUserError: (state, action) => {
      state.loadingFollowUser = false;
      state.errorFollowUser = action.payload;
    },
    followUserReset: (state) => {
      state.loadingFollowUser = false;
      state.errorFollowUser = null;
      state.dataFollowUser = null;
    },

    // User Login
    userLoginReq: (state) => {
      state.loadingUserLogin = true;
      state.errorUserLogin = null;
    },
    userLoginSuccess: (state, action) => {
      state.loadingUserLogin = false;
      state.dataUserLogin = action.payload;
    },
    userLoginError: (state, action) => {
      state.loadingUserLogin = false;
      state.errorUserLogin = action.payload;
    },
  },
});

export const {
  findByUsernameReq,
  findByUsernameSuccess,
  findByUsernameError,
  followUserReq,
  followUserSuccess,
  followUserError,
  followUserReset,
  userLoginReq,
  userLoginSuccess,
  userLoginError,
} = userSlice.actions;

//   Thunk untuk mendapatkan data user berdasarkan username
export function fetchUserByUsername(username) {
  return async (dispatch) => {
    try {
      dispatch(findByUsernameReq());

      //   Panggil API untuk mendapatkan data user berdasarkan username
      const response = await publicAPI.get(`/users/find/${username}`);

      dispatch(findByUsernameSuccess(response.data.data));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(findByUsernameError(errorMessage));
    }
  };
}

// Thunk untuk follow user
export function followUser(username) {
  return async (dispatch) => {
    try {
      dispatch(followUserReq());

      // Panggil API untuk follow user
      const response = await privateAPI.post(`/users/follow/${username}`);
      console.log(response, "response follow user");

      dispatch(followUserSuccess(response.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(followUserError(errMsg));
    }
  };
}

// Thunk untuk user yang sedang login
export function userLogin() {
  return async (dispatch) => {
    try {
      dispatch(userLoginReq());

      // Panggil API untuk mendapatkan data user yang sedang login
      const response = await privateAPI.get("/users/me");

      dispatch(userLoginSuccess(response.data.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(userLoginError(errMsg));
    }
  };
}

export default userSlice.reducer;

// response follow user
// {
//     "data": {
//         "success": true,
//         "data": {
//             "isFollowing": false,
//             "message": "Unfollow user success"
//         },
//         "message": "You have unfollowed ridho"
//     },
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//         "content-length": "117",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http",
//             "fetch"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 10000,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Content-Type": "application/json",
//             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTc3MjYzNzEzOH0.e7F8qP4L6iOAaqEjnuO7ZbbRGqy8tn-SZiapqnyYtu4"
//         },
//         "baseURL": "http://localhost:3000",
//         "method": "post",
//         "url": "/users/follow/ridho",
//         "allowAbsoluteUrls": true
//     },
//     "request": {}
// }

// dataFindUser
// {
//     "id": 5,
//     "username": "ridho",
//     "email": "mridhoamrullah99@gmail.com",
//     "fullName": "Eve Johnson",
//     "bio": "Fitness Coach 💪 | Healthy lifestyle",
//     "avatar": "https://i.pravatar.cc/150?img=5",
//     "isVerified": true,
//     "createdAt": "2026-02-06T08:40:13.077Z",
//     "deletedAt": null,
//     "Posts": [
//         {
//             "id": 9,
//             "UserId": 5,
//             "imageUrl": "https://picsum.photos/600/600?random=9",
//             "caption": "Morning workout routine 💪 #fitness #workout",
//             "createdAt": "2026-02-06T08:40:13.912Z",
//             "updatedAt": "2026-02-06T08:40:13.912Z",
//             "deletedAt": null,
//             "Likes": [
//                 {
//                     "id": 18,
//                     "PostId": 9,
//                     "UserId": 2,
//                     "createdAt": "2026-02-06T08:40:13.947Z",
//                     "updatedAt": "2026-02-06T08:40:13.947Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 19,
//                     "PostId": 9,
//                     "UserId": 3,
//                     "createdAt": "2026-02-06T08:40:13.947Z",
//                     "updatedAt": "2026-02-06T08:40:13.947Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 20,
//                     "PostId": 9,
//                     "UserId": 4,
//                     "createdAt": "2026-02-06T08:40:13.947Z",
//                     "updatedAt": "2026-02-06T08:40:13.947Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 49,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "createdAt": "2026-03-03T15:17:30.851Z",
//                     "updatedAt": "2026-03-03T15:17:30.851Z",
//                     "deletedAt": null
//                 }
//             ],
//             "Comments": [
//                 {
//                     "id": 10,
//                     "PostId": 9,
//                     "UserId": 3,
//                     "content": "Inspiring! 💪",
//                     "createdAt": "2026-02-06T08:40:14.006Z",
//                     "updatedAt": "2026-02-06T08:40:14.006Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 11,
//                     "PostId": 9,
//                     "UserId": 4,
//                     "content": "What's your routine?",
//                     "createdAt": "2026-02-06T08:40:14.006Z",
//                     "updatedAt": "2026-02-06T08:40:14.006Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 13,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "Mommy Jihyo",
//                     "createdAt": "2026-03-03T14:49:07.959Z",
//                     "updatedAt": "2026-03-03T14:49:07.959Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 14,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "Park Jihyo",
//                     "createdAt": "2026-03-03T14:49:55.418Z",
//                     "updatedAt": "2026-03-03T14:49:55.418Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 15,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "halo",
//                     "createdAt": "2026-03-03T14:51:33.471Z",
//                     "updatedAt": "2026-03-03T14:51:33.471Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 16,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "halo tes",
//                     "createdAt": "2026-03-03T14:54:39.121Z",
//                     "updatedAt": "2026-03-03T14:54:39.121Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 17,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "hyein nge comment",
//                     "createdAt": "2026-03-03T14:56:09.028Z",
//                     "updatedAt": "2026-03-03T14:56:09.028Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 18,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "hyein lagi jagoannya",
//                     "createdAt": "2026-03-03T15:04:22.639Z",
//                     "updatedAt": "2026-03-03T15:04:22.639Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 19,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "Wewwwww",
//                     "createdAt": "2026-03-03T15:17:39.187Z",
//                     "updatedAt": "2026-03-03T15:17:39.187Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 22,
//                     "PostId": 9,
//                     "UserId": 13,
//                     "content": "bertemu dengan pujaan hati my bini gwehj🙂‍↕️🫰🏻💗 @goyounjung \n\na big thanks to @netflixid for the front-row barricade seat! I couldn’t be happier to see & interact with my fav actress for straight 2 hours🥹🤏🏻 ",
//                     "createdAt": "2026-03-04T07:49:01.714Z",
//                     "updatedAt": "2026-03-04T07:49:01.714Z",
//                     "deletedAt": null
//                 }
//             ]
//         },
//         {
//             "id": 10,
//             "UserId": 5,
//             "imageUrl": "https://picsum.photos/600/600?random=10",
//             "caption": "Healthy meal prep 🥗",
//             "createdAt": "2026-02-06T08:40:13.912Z",
//             "updatedAt": "2026-02-06T08:40:13.912Z",
//             "deletedAt": null,
//             "Likes": [
//                 {
//                     "id": 21,
//                     "PostId": 10,
//                     "UserId": 3,
//                     "createdAt": "2026-02-06T08:40:13.947Z",
//                     "updatedAt": "2026-02-06T08:40:13.947Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 50,
//                     "PostId": 10,
//                     "UserId": 13,
//                     "createdAt": "2026-03-03T15:30:14.626Z",
//                     "updatedAt": "2026-03-03T15:30:14.626Z",
//                     "deletedAt": null
//                 }
//             ],
//             "Comments": [
//                 {
//                     "id": 12,
//                     "PostId": 10,
//                     "UserId": 3,
//                     "content": "Looks delicious! 🥗",
//                     "createdAt": "2026-02-06T08:40:14.006Z",
//                     "updatedAt": "2026-02-06T08:40:14.006Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 20,
//                     "PostId": 10,
//                     "UserId": 13,
//                     "content": "wew",
//                     "createdAt": "2026-03-03T15:30:18.984Z",
//                     "updatedAt": "2026-03-03T15:30:18.984Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 21,
//                     "PostId": 10,
//                     "UserId": 13,
//                     "content": "yey",
//                     "createdAt": "2026-03-04T06:45:18.312Z",
//                     "updatedAt": "2026-03-04T06:45:18.312Z",
//                     "deletedAt": null
//                 },
//                 {
//                     "id": 23,
//                     "PostId": 10,
//                     "UserId": 13,
//                     "content": "wew",
//                     "createdAt": "2026-03-04T15:24:12.860Z",
//                     "updatedAt": "2026-03-04T15:24:12.860Z",
//                     "deletedAt": null
//                 }
//             ]
//         }
//     ],
//     "Comments": [
//         {
//             "id": 5,
//             "PostId": 3,
//             "UserId": 5,
//             "content": "Love the colors",
//             "createdAt": "2026-02-06T08:40:14.006Z",
//             "updatedAt": "2026-02-06T08:40:14.006Z",
//             "deletedAt": null
//         }
//     ],
//     "Likes": [
//         {
//             "id": 8,
//             "PostId": 3,
//             "UserId": 5,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null
//         }
//     ],
//     "Followers": [
//         {
//             "id": 2,
//             "username": "bob_smith",
//             "email": "bob@example.com",
//             "password": "$2b$10$buQze9uSO/pa2PPjKduUB.2wCI9Kedszq076dvezv3j1cp6z6Z3Le",
//             "fullName": "Bob Smith",
//             "bio": "Photographer 📸 | Nature lover 🌲",
//             "avatar": "https://i.pravatar.cc/150?img=2",
//             "isVerified": false,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         },
// {
//     "id": 13,
//     "username": "leehyein",
//     "email": "leehyein@gmail.com",
//     "fullName": "Lee Hyein",
//     "bio": "Lee Hyein NJZ",
//     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//     "isVerified": true,
//     "createdAt": "2026-02-20T07:33:14.157Z",
//     "deletedAt": null
// }

//         {
//             "id": 3,
//             "username": "charlie_dev",
//             "email": "charlie@example.com",
//             "password": "$2b$10$bLpF/073f.JvTiReO/fze.AvydW4GVB5GhvrVN4SdQxHTaxj/ZIuO",
//             "fullName": "Charlie Developer",
//             "bio": "Full Stack Developer 💻 | Tech geek",
//             "avatar": "https://i.pravatar.cc/150?img=3",
//             "isVerified": true,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         },
//         {
//             "id": 13,
//             "username": "leehyein",
//             "email": "leehyein@gmail.com",
//             "password": "$2b$10$vMrSztOxxvdetEqkqqUTSu/jP2Q.r.GZ2KdCkTEMH/x2YjL/D6HLW",
//             "fullName": "Lee Hyein",
//             "bio": "Lee Hyein NJZ",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true,
//             "createdAt": "2026-02-20T07:33:14.157Z",
//             "updatedAt": "2026-02-20T14:55:40.992Z",
//             "deletedAt": null
//         }
//     ],
//     "Followings": [
//         {
//             "id": 2,
//             "username": "bob_smith",
//             "email": "bob@example.com",
//             "password": "$2b$10$buQze9uSO/pa2PPjKduUB.2wCI9Kedszq076dvezv3j1cp6z6Z3Le",
//             "fullName": "Bob Smith",
//             "bio": "Photographer 📸 | Nature lover 🌲",
//             "avatar": "https://i.pravatar.cc/150?img=2",
//             "isVerified": false,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         },
//         {
//             "id": 3,
//             "username": "charlie_dev",
//             "email": "charlie@example.com",
//             "password": "$2b$10$bLpF/073f.JvTiReO/fze.AvydW4GVB5GhvrVN4SdQxHTaxj/ZIuO",
//             "fullName": "Charlie Developer",
//             "bio": "Full Stack Developer 💻 | Tech geek",
//             "avatar": "https://i.pravatar.cc/150?img=3",
//             "isVerified": true,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         }
//     ],
//     "Notifications": [
//         {
//             "id": 8,
//             "UserId": 5,
//             "type": "comment",
//             "content": "charlie_dev commented on your post",
//             "isRead": true,
//             "createdAt": "2026-02-06T08:40:14.060Z",
//             "updatedAt": "2026-02-06T08:40:14.060Z",
//             "deletedAt": null
//         }
//     ],
//     "isMine": false
// }
