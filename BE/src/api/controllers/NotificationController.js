import notificationModel from '../models/Notification.js';

class NotificationController {
    async fetchNew (req, res) {
        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }
        const cnt = await notificationModel.fetchNew(req.user.id);
        return res.status(200).json({ cntNotice: cnt });
    }

    async fetchLatest (req, res) {
        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }
        const data = await notificationModel.getAll(1, 5, req.user.id, false);
        if (!data.error) {
            return res.status(200).json({ notifications: data.notifications });
        } else {
            return res.status(402).json({ error: 'Something wend wrong' });
        }
    }
}

export default new NotificationController();
