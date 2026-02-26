import { createSlice } from "@reduxjs/toolkit";
import { publicAPI } from "../api/axiosInstance";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    error: null,
    data: null,
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
  },
});

export const { findPostByIdReq, findPostByIdSuccess, findPostByIdError } =
  postSlice.actions;

//   Thunk untuk mendapatkan data post berdasarkan id
export function fetchPostById(PostId) {
  return async (dispatch) => {
    try {
      dispatch(findPostByIdReq());

      //     Panggil API untuk mendapatkan data post berdasarkan id
      const response = await publicAPI.get(`/posts/${PostId}`);

      dispatch(findPostByIdSuccess(response.data.data));
    } catch (error) {
      let errMsg =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(findPostByIdError(errMsg));
    }
  };
}

export default postSlice.reducer;


