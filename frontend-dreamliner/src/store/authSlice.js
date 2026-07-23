import { createSlice } from "@reduxjs/toolkit";
import { publicAPI } from "../api/axiosInstance";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    // Reducer Login
    loginReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLogin = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLogin = false;
    },

    // Reducer Register
    registerReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    registerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reducer Verify Email
    verifyEmailReq: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifyEmailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    verifyEmailError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reducer Logout
    logout: (state) => {
      state.isLogin = false;
      state.data = null;
      localStorage.removeItem("access_token");
      state.error = null;
    },
  },
});

export const {
  loginReq,
  loginSuccess,
  loginError,
  registerReq,
  registerSuccess,
  registerError,
  verifyEmailReq,
  verifyEmailSuccess,
  verifyEmailError,
  logout,
} = authSlice.actions;

// Thunk untuk login
export function login(formData) {
  return async (dispatch) => {
    try {
      dispatch(loginReq());

      //   Lakukan request ke backend
      let response = await publicAPI.post("/auth/login", formData);
      console.log(response.data, "res authSlice");

      localStorage.access_token = response.data.data;

      dispatch(loginSuccess(response.data.message));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login Failed";
      dispatch(loginError(errorMessage));
    }
  };
}

// Thunk untuk register
export function register(formData) {
  return async (dispatch) => {
    try {
      dispatch(registerReq());

      // Lakukan request ke backend
      let response = await publicAPI.post("/auth/register", formData);

      dispatch(registerSuccess(response.data.message));
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Register Failed";

      dispatch(registerError(errorMessage));
      return { success: false, message: errorMessage };
    }
  };
}

// BaekSongMin

// Thunk untuk verify email
export function verifyEmail(token) {
  return async (dispatch) => {
    try {
      dispatch(verifyEmailReq());

      // Lakukan request ke backend
      let response = await publicAPI.patch(`/auth/verify-email`, { token });

      dispatch(verifyEmailSuccess(true));
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Verification Failed";

      dispatch(verifyEmailError(errorMessage));
      return { success: false, message: errorMessage };
    }
  };
}

export default authSlice.reducer;
