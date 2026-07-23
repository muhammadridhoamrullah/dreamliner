const { StoryControlller } = require("../controllers/storyController");
const { authentication } = require("../middlewares/authentication");

const storyRouter = require("express").Router();

storyRouter.use(authentication);
storyRouter.post("/createStory", StoryControlller.createStory);
storyRouter.get("/tray", StoryControlller.getStoryTray);
storyRouter.get("/user/:username", StoryControlller.getStoryByUsername);
storyRouter.post("/:StoryId/view", StoryControlller.viewStory);
storyRouter.post("/:StoryId/reply", StoryControlller.replyStory)

module.exports = {
  storyRouter,
};
