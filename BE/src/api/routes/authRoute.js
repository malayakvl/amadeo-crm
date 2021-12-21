import * as express from 'express';
import authController from '../controllers/AuthController.js';
import UserController from '../controllers/UserController.js';

const authRoute = express.Router();

authRoute.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

authRoute.post('/login', authController.authLogin);
authRoute.post('/register', authController.authRegister);
authRoute.post('/invite', authController.authInvite);
authRoute.post('/provider', authController.authProvider);
authRoute.post('/restorePassword', authController.restorePassword);
authRoute.get('/invitation/:hash', authController.getInvitation);
authRoute.get('/activate-hash/:hash', authController.activateHash);
authRoute.get('/user/email/:email', UserController.getUserByEmail)
export default authRoute;
