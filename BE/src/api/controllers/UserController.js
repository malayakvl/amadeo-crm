import userModel from '../models/User.js';
import multer from 'multer';
import fs from 'fs';

class UserController {
    async getProfile (req, res) {
        const user = req.user;
        if (!user) {
            return res.status(401).json({user: null, addresses: {}});
        }
        delete user.salt;
        delete user.password;
        delete user.hash;
        delete user.expired_at;
        return res.status(200).json({ user: user, addresses: {} });
    }

    async updateProfile (req, res) {
        // const _user = req.user;
        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }
        const dirUpload = `${process.env.DOWNLOAD_FOLDER}/users/${req.user.id}`;
        if (!fs.existsSync(dirUpload)) {
            fs.mkdirSync(dirUpload);
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `public/uploads/users/${req.user.id}`);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
        const upload = multer({ storage: storage }).single('photo');
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
            const dataUser = req.body;
            if (req.file) {
                dataUser.photo = `/uploads/users/${req.user.id}/${req.file.filename}`;
            }
            await userModel.update(dataUser);
            const user = await userModel.findUserByEmail(req.user.email);
            delete user.password;
            delete user.salt;
            delete user.hash;
            delete user.expired_at;
            return res.status(200).json({ user: user });
        });
    }

    async addAddress (req, res) {
        let status;
        const user = req.user;
        if (user) {
            status = await userModel.addAddress(user.id, req.body);
            return res.status(200).json({ status: status });
        } else {
            return res.status(402).json('Something wend wrong');
        }
    }

    async fetchAddresses (req, res) {
        if (req.user) {
            const addresses = await userModel.findUserAddresses(req.user.id);
            return res.status(200).json({ addresses: addresses });
        }
        return res.status(402).json('Something wend wrong');
    }

    async fetchAddress (req, res) {
        const address = await userModel.findUserAddress('', req.params.id);
        if (address) {
            return res.status(200).json({ address: address });
        }
        return res.status(402).json('Something wend wrong');
    }

    async deleteAddress (req, res) {
        const status = await userModel.deleteAddress(req.params.id);
        if (status) {
            return res.status(200).json({ status: status });
        }
        return res.status(402).json('Something wend wrong');
    }

    async changePassword (req, res) {
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
