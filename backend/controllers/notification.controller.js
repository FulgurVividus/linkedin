import Notification from "../models/notification.model.js";

//# get user notifications
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image");

    res.status(200).json(notifications);
  } catch (error) {
    console.error(`Error in getUserNotifications controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//# mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(
      {
        _id: notificationId,
        recipient: req.user._id,
      },
      { read: true },
      { new: true }
    );

    res.json(notification);
  } catch (error) {
    console.error(
      `Error in markNotificationAsRead controller: ${error.message}`
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

//# delete notification
export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    await Notification.findOneAndDelete({
      _id: notificationId,
      recipient: req.user._id,
    });

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteNotification controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
