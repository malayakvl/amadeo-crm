import * as express from 'express';
import authController from '../controllers/AuthController.js';
// import passport from '../middleware/passport.js';
// import { getTokensAndSetCookies } from '../lib/token.js';

const authRoute = express.Router();

authRoute.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

authRoute.post('/login', authController.authLogin);
authRoute.post('/register', authController.authRegister);
authRoute.post('/provider', authController.authProvider);
// authRoute.post('/reset', authController.authReset);
// authRoute.patch('/change-password', authController.authChange);
// authRoute.post('/signup', authController.authRegister);
// authRoute.get('/logout', authController.authLogout);

export default authRoute;
