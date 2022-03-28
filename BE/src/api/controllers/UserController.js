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
    
    async fetchSettings (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const data = await userModel.fetchUserSettings(req.user.id);
        return res.status(200).json({ item: data[0]});
    }
    
    async updateSettings (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const data = await userModel.updateSellerSettings(req.user.id, req.body);
        return res.status(200).json({ success: data.success });
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
            delete dataUser.email;
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
    
    async createUserFromSubscription (req, res) {
        const data = await userModel.createUserFromSubscription(req.body.userData, req.body.planId, req.body.type);
        if (data.subscription) {
            // console.log('DATA SUBSCRIPTION', data.subscription);
            return res.status(200).json({
                user: null,
                subscription: data.subscription,
                clientSecret: data.subscription.status === 'trialing' ? null : data.subscription.latest_invoice.payment_intent.client_secret
            });
        } else {
            return res.status(402).json('Something wend wrong');
        }
    }
    
    async getSubscription(req, res) {
        if (req.user) {
            const data = await userModel.getSubscriptionInfo(req.user.subscription_id, req.user.customer_id);
            if (data.subscription) {
                return res.status(200).json({
                    subscription: data.subscription,
                });
            } else {
                return res.status(402).json('Something wend wrong');
            }
        } else {
            return res.status(402).json('Something wend wrong');
        }
    }
    
    async createExistUserSubscription (req, res) {
        if (req.user) {
            const data = await userModel.createExistUserSubscription(req.body, req.user);
            const user = await userModel.findUserByEmail(req.user.email);
            if (data.subscription) {
                // console.log(data.subscription);
                return res.status(200).json({
                    user: user,
                    subscription: data.subscription,
                    clientSecret: data.subscription.status === 'trialing' ? null : data.subscription.latest_invoice.payment_intent.client_secret
                });
            } else {
                return res.status(402).json('Something wend wrong');
            }
        }
        return res.status(402).json('Something wend wrong');
    }
    
    
    async checkPaymentStatus (req, res) {
        const data = await userModel.checkPayment(req.body.paymentIntent, req.body.paymentIntentSecret);
        if (data.paymentIntent) {
            return res.status(200).json({
                paymentIntent: data.paymentIntent
            });
        }
        return res.status(200).json('Something wend wrong');
    }
    
    async unsubscribe (req, res) {
        return res.status(200).json({success: true});
    }
}

export default new UserController();
