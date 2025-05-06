const Notification = require("../models/norificationModel")





const getNotification = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await Notification.find({ to: userId })
            .populate('from', 'name avatar')
            .populate('reciepe', 'title images')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            notifications
        });

    } catch (err) {
        console.error("Error in getNotification:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error in getNotification"
        });
    }
};

module.exports = getNotification;


