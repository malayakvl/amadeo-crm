import passport from '../middleware/passport.js';
import userModel from '../models/User.js';
import { getTokensAndSetCookies } from '../lib/token.js';

class AuthController {
    /**
     * Login user via email and password
     * @param req
     * @param res
     * @param next
     */
    authLogin (req, res, next) {
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
    async authProvider (req, res) {
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
    async authRegister (req, res) {
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
}

export default new AuthController();
