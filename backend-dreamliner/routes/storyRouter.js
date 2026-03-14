const { StoryControlller } = require("../controllers/storyController");
const { authentication } = require("../middlewares/authentication");

const storyRouter = require("express").Router();

storyRouter.use(authentication);
storyRouter.post("/createStory", StoryControlller.createStory);
storyRouter.get("/tray", StoryControlller.getStoryTray);

module.exports = {
  storyRouter,
};
