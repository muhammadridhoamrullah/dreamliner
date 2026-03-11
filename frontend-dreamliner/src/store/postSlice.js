import { createSlice, current } from "@reduxjs/toolkit";
import privateAPI, { publicAPI } from "../api/axiosInstance";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    error: null,
    data: null,
    loadingLike: false,
    errorLike: null,
    dataLike: null,
    loadingComment: false,
    errorComment: null,
    dataComment: null,
    loadingMyFeed: true,
    errorMyFeed: null,
    dataMyFeed: null,
  },
  reducers: {
    findPostByIdReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    findPostByIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    findPostByIdError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // like/unlike post
    likePostReq: (state) => {
      state.loadingLike = true;
      state.errorLike = null;
    },
    likePostSuccess: (state, action) => {
      state.loadingLike = false;
      state.dataLike = action.payload;

      // Debug dengan current
      // console.log("Before Update", current(state.dataMyFeed));

      // Untuk single post
      if (state.data?.postData) {
        const wasLiked = state.data.isLikeByUserId;

        state.data.isLikeByUserId = !wasLiked;

        if (wasLiked) {
          state.data.postData.Likes = state.data.postData.Likes.filter(
            (el) => el.id !== action.payload.likeData.id,
          );
        } else {
          state.data.postData.Likes.push(action.payload.likeData);
        }
      }

      // Untuk my feed
      if (state.dataMyFeed && Array.isArray(state.dataMyFeed)) {
        const postIndex = state.dataMyFeed.findIndex(
          (post) => post.id === action.payload.likeData.PostId,
        );

        if (postIndex !== -1) {
          const post = state.dataMyFeed[postIndex];

          let wasLikedRn = post.isLikedByUserId;
          post.isLikedByUserId = !wasLikedRn;

          if (wasLikedRn) {
            // unlike: hapus like dari array Likes

            post.Likes = post.Likes.filter(
              (like) => like.id !== action.payload.likeData.id,
            );
          } else {
            // like: tambahkan like ke array Likes

            post.Likes.push(action.payload.likeData);
          }
        }
      }
    },
    likePostError: (state, action) => {
      state.loadingLike = false;
      state.errorLike = action.payload;
    },

    // comment post
    commentPostReq: (state) => {
      state.loadingComment = true;
      state.errorComment = null;
    },
    commentPostSuccess: (state, action) => {
      state.loadingComment = false;
      state.dataComment = action.payload;
      if (state.data?.postData) {
        state.data.postData.Comments.push(action.payload);
      }
    },
    commentPostError: (state, action) => {
      state.loadingComment = false;
      state.errorComment = action.payload;
    },

    // my Feed
    myFeedReq: (state) => {
      state.errorMyFeed = null;
    },
    myFeedSuccess: (state, action) => {
      state.loadingMyFeed = false;
      state.dataMyFeed = action.payload;
    },
    myFeedError: (state, action) => {
      state.loadingMyFeed = false;
      state.errorMyFeed = action.payload;
    },
  },
});

export const {
  findPostByIdReq,
  findPostByIdSuccess,
  findPostByIdError,
  likePostReq,
  likePostSuccess,
  likePostError,
  commentPostReq,
  commentPostSuccess,
  commentPostError,
  myFeedReq,
  myFeedSuccess,
  myFeedError,
} = postSlice.actions;

//   Thunk untuk mendapatkan data post berdasarkan id
export function fetchPostById(PostId) {
  return async (dispatch) => {
    try {
      dispatch(findPostByIdReq());

      //     Panggil API untuk mendapatkan data post berdasarkan id
      const response = await publicAPI.get(`/posts/find/${PostId}`);

      dispatch(findPostByIdSuccess(response.data.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(findPostByIdError(errMsg));
    }
  };
}

// Thunk untuk like/unlike post
export function toggleLikePost(PostId) {
  return async (dispatch) => {
    try {
      dispatch(likePostReq());

      // Panggil API untuk like/unlike post
      const response = await privateAPI.post(`/posts/likes/${PostId}`);

      dispatch(likePostSuccess(response.data.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(likePostError(errMsg));
    }
  };
}

// Thunk untuk comment post
export function commentPost(PostId, comment) {
  return async (dispatch) => {
    try {
      dispatch(commentPostReq());

      // Panggil API untuk comment post
      const response = await privateAPI.post(`/posts/comments/${PostId}`, {
        comment,
      });
      console.log(response, "response commentPost Slice");

      dispatch(commentPostSuccess(response.data.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(commentPostError(errMsg));
    }
  };
}

// Thunk untuk mendapatkan my feed
export function fetchMyFeed() {
  return async (dispatch) => {
    try {
      dispatch(myFeedReq());

      // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulasi delay 1 detik
      // Panggil API untuk mendapatkan my feed
      const response = await privateAPI.get("/posts/myFeed");

      dispatch(myFeedSuccess(response.data.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(myFeedError(errMsg));
    }
  };
}

export default postSlice.reducer;

// {
//     "liked": true,
//     "action": "liked",
//     "likeData": {
//         "id": 56,
//         "PostId": 2,
//         "UserId": 13,
//         "updatedAt": "2026-03-11T07:20:25.377Z",
//         "createdAt": "2026-03-11T07:20:25.377Z",
//         "deletedAt": null
//     }
// }
