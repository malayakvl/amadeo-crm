import passport from '../middleware/passport.js';
import userModel from '../models/User.js';
import invitationModel from '../models/Invitation.js'
import { getTokensAndSetCookies } from '../lib/token.js';
import { sendMail } from '../lib/sendMail.js';

class AuthController {
    /**
     * Login user via email and password
     * @param req
     * @param res
     * @param next
     */
    authLogin(req, res, next) {
        passport.authenticate('local', { session: false },
            (err, authUser, info) => {
                if (err) {
                    return res.status(500).json({ code: 500, message: err.message });
                }
                if (!authUser) {
                    return res.status(400).json({ code: 400, message: info.message });
                }
                req.login(authUser, { session: false }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    getTokensAndSetCookies(req, res, authUser.id, authUser.email);

                    res.status(200).json({ user: authUser });
                });
            }
        )(req, res, next);
    }

    /**
     * Login/Create account via providers
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async authProvider(req, res) {
        const { user, error } = await userModel.provider(req.body);
        if (error) {
            return res.status(error.code).json(error);
        }
        res.status(200).json({ user: user });
    }

    /**
     * Register new user via form data
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async authRegister(req, res) {
        const _user = await userModel.findUserByEmail(req.body.email);
        if (_user) {
            res.status(402).json({ user: null, error: 'Email present' });
        } else {
            const { user, error } = await userModel.create(req.body);
            if (error) {
                return res.status(error.code).json(error);
            }
            // sendEmail('welcome', user);
            req.login(user, { session: false },
                (error) => {
                    if (error) {
                        res.send(error);
                    }
                    getTokensAndSetCookies(req, res, user.id, user.email);

                    res.status(200).json({ user: user });
                }
            );
        }
    }

    async authInvite(req, res) {
        const data = req.body;
        const basicLink = `${process.env.APPLICATION_BASE_URL}/auth/invite-link?hash=`;
        const sendLink = (link) => sendMail(
            data.email,
            'Amadeo CRM - Registration',
            `Follow <a href='${link}'>link</a> for continue`
        );

        let invitation = await invitationModel.findByEmail(data.email);
        if (invitation) {
            sendLink(basicLink + invitation.hash)

            return res.status(200).json({ status: 'success' });

        }

        invitation = await invitationModel.create(data);

        sendLink(basicLink + invitation.hash)

        return res.status(200).json({ status: 'success' });
    }


    async restorePassword(req, res) {
        const _user = await userModel.findUserByEmail(req.body.email);

        if (_user) {
            const { success, hash } = await userModel.generateRestoreHash(_user);
            if (success) {
                const link = `${process.env.APPLICATION_BASE_URL}/auth/activateHash?hash=${hash}`;
                sendMail(
                    req.body.email,
                    'Amadeo CRM - restore password',
                    `
                        Hi, ${req.body.email}!<br>
                        You can use following <a href='${link}'>link</a> for continue
                        <br><br>
                        Good luck!
                `);

                res.status(200).json({ status: success });
            } else {
                res.status(402).json({ status: false });
            }
        } else {
            res.status(402).json({ status: false, error: 'wrong email' });
        }
    }

    async activateHash(req, res) {
        const user = await userModel.activateByHash(req.params.hash);
        if (user) {
            res.status(200).json({ user: user });
        } else {
            res.status(402).json({ user: null, error: 'No user or token expired' });
        }
    }

    async getInvitation(req, res) {
        if (!req.params) {
            return res.status(404).json({})

        }

        if (!req.params.hash) {
            return res.status(404).json({})

        }

        let hash = await invitationModel.findByHash(req.params.hash)

        if (hash && hash.active) {
            return res.status(200).json(hash);

        }

        return res.status(404).json({})
    }
}

export default new AuthController();
