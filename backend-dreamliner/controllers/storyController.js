const { StoryService } = require("../services/StoryService");

class StoryControlller {
  static async createStory(req, res, next) {
    try {
      const UserId = req.user.id;
      const { mediaType, mediaUrl, caption, privacy, allowReply, allowShare } =
        req.body;

      if (!mediaUrl) {
        throw { name: "MEDIA_URL_REQUIRED" };
      }

      //   Panggil service untuk membuat story
      const createStory = await StoryService.createStory(
        UserId,
        mediaType,
        mediaUrl,
        caption,
        privacy,
        allowReply,
        allowShare,
      );

      res.status(201).json({
        success: true,
        data: createStory,
        message: "Create story success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStoryTray(req, res, next) {
    try {
      const UserId = req.user.id;

      // Panggil service untuk mendapatkan story tray
      const storyTrayData = await StoryService.getStoryTray(UserId);

      res.status(200).json({
        success: true,
        data: storyTrayData,
        message: "Get story tray success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  StoryControlller,
};
