import { createSlice } from "@reduxjs/toolkit";
import privateAPI from "../api/axiosInstance";

export const storySlice = createSlice({
  name: "story",
  initialState: {
    // state untuk create story
    loadingCreateStory: false,
    dataCreateStory: null,
    errorCreateStory: null,
    // state untuk story tray
    loadingGetStoryTray: false,
    dataGetStoryTray: null,
    errorGetStoryTray: null,
    // state untuk get story by username
    loadingGetStoryByUsername: false,
    dataGetStoryByUsername: null,
    errorGetStoryByUsername: null,
    // state untuk view story
    loadingViewStory: false,
    dataViewStory: null,
    errorViewStory: null,
    // state untuk reply story
    loadingReplyStory: false,
    dataReplyStory: null,
    errorReplyStory: null,
  },
  reducers: {
    // createStory
    createStoryReq: (state) => {
      state.loadingCreateStory = true;
      state.errorCreateStory = null;
    },
    createStorySuccess: (state, action) => {
      state.loadingCreateStory = false;
      state.dataCreateStory = action.payload;
    },
    createStoryError: (state, action) => {
      state.loadingCreateStory = false;
      state.errorCreateStory = action.payload;
    },

    // storyTray
    storyTrayReq: (state) => {
      state.loadingGetStoryTray = true;
      state.errorGetStoryTray = null;
    },
    storyTraySuccess: (state, action) => {
      state.loadingGetStoryTray = false;
      state.dataGetStoryTray = action.payload;
    },
    storyTrayError: (state, action) => {
      state.loadingGetStoryTray = false;
      state.errorGetStoryTray = action.payload;
    },

    // getStoryByUsername
    storyByUsernameReq: (state) => {
      state.loadingGetStoryByUsername = true;
      state.errorGetStoryByUsername = null;
    },
    storyByUsernameSuccess: (state, action) => {
      state.loadingGetStoryByUsername = false;
      state.dataGetStoryByUsername = action.payload;
    },
    storyByUsernameError: (state, action) => {
      state.loadingGetStoryByUsername = false;
      state.errorGetStoryByUsername = action.payload;
    },

    // viewStory
    viewStoryReq: (state) => {
      state.loadingViewStory = true;
      state.errorViewStory = null;
    },
    viewStorySuccess: (state, action) => {
      state.loadingViewStory = false;
      state.dataViewStory = action.payload;
    },
    viewStoryError: (state, action) => {
      state.loadingViewStory = false;
      state.errorViewStory = action.payload;
    },

    // replyStory
    replyStoryReq: (state) => {
      state.loadingReplyStory = true;
      state.errorReplyStory = null;
    },
    replyStorySuccess: (state, action) => {
      state.loadingReplyStory = false;
      state.dataReplyStory = action.payload;
    },
    replyStoryError: (state, action) => {
      state.loadingReplyStory = false;
      state.errorReplyStory = action.payload;
    },
  },
});

export const {
  createStoryReq,
  createStorySuccess,
  createStoryError,
  storyTrayReq,
  storyTraySuccess,
  storyTrayError,
  storyByUsernameReq,
  storyByUsernameSuccess,
  storyByUsernameError,
  viewStoryReq,
  viewStorySuccess,
  viewStoryError,
  replyStoryReq,
  replyStorySuccess,
  replyStoryError,
} = storySlice.actions;

// Thunk untuk create story
export function createStory(data) {
  return async (dispatch) => {
    try {
      dispatch(createStoryReq());

      // Panggil API untuk create story
      const response = await privateAPI.post("/stories/createStory", data);
      console.log(response, "response create story");

      dispatch(createStorySuccess.data.data);
    } catch (error) {
      let errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(createStoryError(errMsg));
    }
  };
}

//   Thunk untuk fetch story tray
export function fetchStoryTray() {
  return async (dispatch) => {
    try {
      dispatch(storyTrayReq());

      //   Panggil API untuk fetch story tray
      const response = await privateAPI.get("/stories/tray");

      dispatch(storyTraySuccess(response.data.data || []));
    } catch (error) {
      let errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(storyTrayError(errMsg));
    }
  };
}

// Thunk untuk fetch story by username
export function fetchStoryByUsername(username) {
  return async (dispatch) => {
    try {
      dispatch(storyByUsernameReq());

      // Panggil API untuk fetch story by username
      const response = await privateAPI.get(`/stories/user/${username}`);

      console.log(response, "response fetchStoryByUsername");

      dispatch(storyByUsernameSuccess(response.data));
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(storyByUsernameError(errMsg));
    }
  };
}

// Thunk untuk view story
export function viewStory(StoryId) {
  return async (dispatch) => {
    try {
      dispatch(viewStoryReq());

      // Panggil API untuk view story
      const response = await privateAPI.post(`/stories/${StoryId}/view`);

      console.log(response, "response view story");

      dispatch(viewStorySuccess(response.data));
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(viewStoryError(errMsg));
    }
  };
}

// Thunk untuk reply story
export function replyStory(StoryId, message) {
  return async (dispatch) => {
    try {
      dispatch(replyStoryReq());

      // Panggil API untuk reply story
      const response = await privateAPI.post(`/stories/${StoryId}/reply`, {
        message,
      });
      console.log(response, "Response replyStory slice");

      dispatch(replyStorySuccess(response.data));
    } catch (error) {
      let errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(replyStoryError(errMsg));
    }
  };
}

export default storySlice.reducer;

// storyRouter.post("/createStory", StoryControlller.createStory);
// storyRouter.get("/tray", StoryControlller.getStoryTray);
// storyRouter.get("/user/:username", StoryControlller.getStoryByUsername);
// storyRouter.post("/:StoryId/view", StoryControlller.viewStory);
// storyRouter.post("/:StoryId/reply", StoryControlller.replyStory)
