const notificationModel = require("../models/notificationModel");

const notificationController = {
  get: async (req, res) => {
    try {
      const notifications = await notificationModel.findOne({
        userId: req.params.userId,
      });
      return res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
  push: async (req, res) => {
    try {
      const userNotification = await notificationModel.findOne({
        userId: req.body.userId,
      });
      if (!userNotification) {
        await notificationModel.create({
          userId: req.body.userId,
          notifications: [
            {
              title: "Ứng tuyển thành công",
              body: "Chúng tôi đã gửi CV đến doanh nghiệp",
              companyName: req.body.companyName,
            },
          ],
        });
      } else {
        userNotification.notifications.push({
          title: "Ứng tuyển thành công",
          body: "Chúng tôi đã gửi CV đến doanh nghiệp",
          companyName: req.body.companyName,
        });
        await userNotification.save();
      }
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error);
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
};

module.exports = notificationController;
