const notificationModel = require("../models/notificationModel");

const notificationController = {
  get: async (req, res) => {
    try {
      const notifications = await notificationModel.findOne({
        userId: req.decoded._id,
      });
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
  push: async (req, res) => {
    try {
      const { userId, companyName, jobTitle, status } = req.body;

      let userNotification = await notificationModel.findOne({ userId });

      if (!userNotification) {
        userNotification = await notificationModel.create({
          userId,
          notifications: [],
        });
      }

      let title, body;
      if (status === "appropriate" || status === "inappropriate") {
        title =
          status === "appropriate" ? "Hồ sơ phù hợp" : "Hồ sơ chưa phù hợp";
        body =
          status === "appropriate"
            ? "Nhà tuyển dụng đã đánh giá CV của bạn là phù hợp"
            : "Nhà tuyển dụng đã đánh giá CV của bạn chưa phù hợp";
      } else if (req.body.viewed) {
        title = "Hồ sơ đã xem";
        body = "Chúng tôi đã xem hồ sơ của bạn";
      } else {
        title = "Ứng tuyển thành công";
        body = "Chúng tôi đã gửi CV đến doanh nghiệp";
      }

      userNotification.notifications.push({
        title,
        body,
        companyName,
        jobTitle,
      });

      await userNotification.save();

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  deleteNotification: async (req, res) => {
    try {
      await notificationModel.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  checkAll: async (req, res) => {
    try {
      const notifications = await notificationModel.updateMany(
        { userId: req.decoded._id },
        { $set: { "notifications.$[].viewed": true } }
      );
      if (!notifications) {
        return res.status(404).json({ message: "No notifications to update" });
      }

      return res
        .status(200)
        .json({ message: "All notifications checked successfully" });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
};

module.exports = notificationController;
