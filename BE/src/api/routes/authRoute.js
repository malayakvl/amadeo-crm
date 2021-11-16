import * as express from 'express';
import authController from '../controllers/AuthController.js';
import passport from '../middleware/passport.js';
import { getTokensAndSetCookies } from '../lib/token.js';

const authRoute = express.Router();

authRoute.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

authRoute.post('/login', authController.authLogin);
authRoute.post('/reset', authController.authReset);
authRoute.get('/refresh-token', authController.authRefresh);
authRoute.get('/activate-email/:hash', function (req, res, next) {
    // eslint-disable-next-line node/handle-callback-err
    passport.authenticate('custom', function (err, user, info) {
        if (user) {
            getTokensAndSetCookies(req, res, user.user.id, user.user.email);
        } else {
            res.redirect('/login');
        }
    })(req, res, next);
});

authRoute.post('/reactivate-email', authController.authActivate);
authRoute.patch('/change-password', authController.authChange);
authRoute.post('/signup', authController.authRegister);
authRoute.get('/logout', authController.authLogout);

authRoute.route('/google/callback')
    .get(passport.authenticate('google', {
        failureRedirect: '/login'
    }), authController.authSetJWTCookie);

authRoute.route('/google')
    .get(passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

authRoute.route('/facebook')
    .get(passport.authenticate('facebook', { scope: ['email'] }));

authRoute.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), authController.authSetJWTCookie);

export default authRoute;
