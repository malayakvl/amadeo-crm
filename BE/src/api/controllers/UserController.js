import userModel from '../models/User.js';
import countryModel from '../models/Country.js'
import multer from 'multer';
import fs from 'fs';

class UserController {
    async getProfile(req, res) {
        const user = req.user;

        if (!user) {
            return res.status(401).json({});
        }

        delete user.salt;
        delete user.password;
        delete user.hash;
        delete user.expired_at;

        let response = {
            ...user,
            address: {},
            user: user
        }

        const address = await userModel.findUserAddress(req.user.id);
        if (address) {
            const country = await countryModel.findById(address.country_id)

            response.address = {
                ...address,
                country
            }
        }

        return res.status(200).json(response);
    }
    
    async fetchSellers (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const data = await userModel.findUsersSuggestion(req.query.searchStr, 2);
        return res.status(200).json({ result: data});
    }
    
    async fetchBuyers (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const data = await userModel.findUsersSuggestion(req.query.searchStr, 1);
        return res.status(200).json({ result: data});
    }

    async updateProfile(req, res) {
        // const _user = req.user;
        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }
        const dirUpload = `${process.env.DOWNLOAD_FOLDER}/users/${req.user.id}`;
        if (!fs.existsSync(dirUpload)) {
            fs.mkdirSync(dirUpload, { recursive: true });
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
            await userModel.update(dataUser, req.user.id);
            const user = await userModel.findUserByEmail(req.user.email);
            delete user.password;
            delete user.salt;
            delete user.hash;
            delete user.expired_at;
            return res.status(200).json({ user: user });
        });
    }

    async saveAddress(req, res) {
        let status;
        const user = req.user;
        if (user) {
            status = await userModel.saveAddress(user.id, req.body);
            return res.status(200).json({ status: status });
        } else {
            return res.status(402).json('Something wend wrong');
        }
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
    
    async syncFb (req, res) {
        if (req.user) {
            const data = await userModel.syncFb(req.user, req.body);
            if (data.user) {
                return res.status(200).json({ user: data.user });
            }
        }
        return res.status(402).json('Something wend wrong');
    }
}

export default new UserController();
