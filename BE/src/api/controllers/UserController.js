import userModel from '../models/User.js';

class UserController {
    async getProfile(req, res) {
        const user = req.user;
        if (!user) {
            return res.status(402).json('Something wend wrong');
        }
        delete user.salt;
        delete user.password;
        return res.status(200).json({ user: user, addresses: {} });
    }
    
    async updateProfile(req, res) {
        const user = req.user;
        if (!user) {
            return res.status(402).json('Something wend wrong');
        }
        await userModel.update(req.body);
        return res.status(200).json({ user: user });
    }
    
    async addAddress(req, res) {
        let status;
        const user = req.user;
        if (user) {
            status = await userModel.addAddress(user.id, req.body);
            return res.status(200).json({ status: status });
        } else {
            return res.status(402).json('Something wend wrong');
        }
    }
    
    async fetchAddresses(req, res) {
        if (req.user) {
            const addresses = await userModel.findUserAddresses(req.user.id);
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
    
    async changePassword(req, res) {
        if (req.user) {
            const status = await userModel.changePassword(req.user, req.body);
            if (status) {
                return res.status(200).json({ status: status });
            }
        }
        return res.status(402).json('Something wend wrong');
    }
}

export default new UserController();
