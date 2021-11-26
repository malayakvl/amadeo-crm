import userModel from '../models/User.js';

class UserController {
    async getProfile(req, res) {
        const user = await userModel.findUserByEmail(req.query.email);
        delete user.salt;
        delete user.password;
        if (!user) {
            return res.status(402).json('Something wend wrong');
        }
        // const addresses = await userModel.findUserAddresses(user.id);
        return res.status(200).json({ user: user, addresses: {} });
    }
    
    async updateProfile(req, res) {
        const user = await userModel.update(req.body);
        if (!user) {
            return res.status(402).json('Something wend wrong');
        }
        return res.status(200).json({ user: user });
    }
    
    async addAddress(req, res) {
        let status;
        const user = await userModel.findUserByEmail(req.params.email);
        if (user) {
            status = await userModel.addAddress(user.id, req.body);
            return res.status(200).json({ status: status });
        } else {
            return res.status(402).json('Something wend wrong');
        }
    }
    
    async fetchAddresses(req, res) {
        const user = await userModel.findUserByEmail(req.params.email);
        if (user) {
            const addresses = await userModel.findUserAddresses(user.id);
            return res.status(200).json({ addresses: addresses });
        }
        return res.status(402).json('Something wend wrong');
    }
    
    async fetchAddress(req, res) {
        const address = await userModel.findUserAddress('', req.params.id);
        if (address) {
            return res.status(200).json({ address: address });
        }
        return res.status(402).json('Something wend wrong');
    }
    
    async deleteAddress(req, res) {
        const status = await userModel.deleteAddress(req.params.id);
        if (status) {
            return res.status(200).json({ status: status });
        }
        return res.status(402).json('Something wend wrong');
    }
}

export default new UserController();
