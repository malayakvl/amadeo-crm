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
        let formData = req.body;
        let email = formData.email

        let invitation = await invitationModel.findByEmail(email);

        if (!invitation) {
            return res.status(403).json({ message: "You don't have invitation" });

        }

        if (!invitation.active) {
            return res.status(403).json({ message: "Your invitation isn't active" });

        }

        const _user = await userModel.findUserByEmail(email);

        if (_user) {
            return res.status(403).json({ user: null, error: 'Email present' });

        }

        let createUserData = { ...formData, role_id: invitation.role_id }


        const { user, error } = await userModel.create(createUserData);

        if (error) {
            return res.status(error.code).json(error);

        }

        invitationModel.deactivate(invitation.id)

        return res.status(200).json({ user })

    }

    async authInvite(req, res) {
        const data = req.body;

        const user = await userModel.findUserByEmail(data.email);

        if (user) {
            return res.status(403).json({ message: 'Email present' });

        }

        let invitation = await invitationModel.findByEmail(data.email);

        if (invitation) {
            await invitationModel.delete(invitation.id)

        }

        invitation = await invitationModel.create(data);

        let link = `${process.env.APPLICATION_BASE_URL}/auth/registration?hash=${invitation.hash}`;

        sendMail(
            data.email,
            'Amadeo CRM - Registration',
            `
            Welcome at Proshop, (${data.email})! \n
            Here’s the verification link - <a href='${link}'>${link}</a> \n
            Please, complete the registration via this link \n
            Regards, Proshop Team
            `
        );

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
                console.log('Restore link', link);
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
