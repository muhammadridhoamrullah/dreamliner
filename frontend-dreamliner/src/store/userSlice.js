import { createSlice } from "@reduxjs/toolkit";
import { publicAPI } from "../api/axiosInstance";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    findByUsernameReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    findByUsernameSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    findByUsernameError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { findByUsernameReq, findByUsernameSuccess, findByUsernameError } =
  userSlice.actions;

//   Thunk untuk mendapatkan data user berdasarkan username
export function fetchUserByUsername(username) {
  return async (dispatch) => {
    try {
      dispatch(findByUsernameReq());

      //   Panggil API untuk mendapatkan data user berdasarkan username
      const response = await publicAPI.get(`/users/find/${username}`);
      console.log(response, "res user");

      dispatch(findByUsernameSuccess(response.data.data));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      dispatch(findByUsernameError(errorMessage));
    }
  };
}

export default userSlice.reducer;
