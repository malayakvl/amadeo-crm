import { sendMail } from '../lib/sendMail.js';

class SupportController {
    async sendMessage(req, res) {
        const { email, message } = req.body
        
        sendMail(
            'info@liveproshop.com',
            `Support message from ${email}`,
            message.replaceAll('\n', '<br>')
        );

        sendMail(
            email,
            `Proshop`,
            `Your message has been sent to support!`
        );

        return res.status(200).json({})

    }
}

export default new SupportController();
