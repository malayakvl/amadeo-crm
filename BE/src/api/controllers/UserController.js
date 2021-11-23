import userModel from '../models/User.js';

class UserController {
    async getProfile(req, res) {
        const user = await userModel.findUserByEmail(req.query.email);
        delete user.salt;
        delete user.password;
        if (!user) {
            return res.status(402).json('Something wend wrong');
        }
        return res.status(200).json({ user: user });
    }
    
    async updateProfile(req, res) {
        const user = await userModel.update(req.body);
        if (!user) {
            return res.status(402).json('Something wend wrong');
        }
        return res.status(200).json({ user: user });
    }
}

export default new UserController();
