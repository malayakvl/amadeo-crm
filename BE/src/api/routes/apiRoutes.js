import * as express from 'express';
import TestController from '../controllers/TestController.js';
import UserController from '../controllers/UserController.js';
import PageController from '../controllers/PageController.js';
import CountryController from '../controllers/CountryController.js';
import NotificationController from '../controllers/NotificationController.js';
import userModel from '../models/User.js';

const apiRoutes = express.Router();

apiRoutes.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

apiRoutes.route('/post-test').get(TestController.testData);
apiRoutes.route('/post-test').post(TestController.testData);
apiRoutes.route('/upload').post(TestController.uploadFile);

apiRoutes.route('/countries').get(CountryController.getAll);

apiRoutes.route('/pages/all').get(PageController.getAll);
apiRoutes.route('/pages').get(PageController.getPage);

/** ===================================================================== */
/** ================== AUTHENTIFICATED ROUTES =========================== */
/** ===================================================================== */
apiRoutes.use(async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const decodedJsonObjectString = Buffer.from(bearer[1], 'base64').toString('ascii');
        const decodedJsonObject = decodedJsonObjectString.split(':');
        req.user = await userModel.findUserByEmail(decodedJsonObject[0]);
        next();
    } else {
        res.status(401).json({ code: 401, message: 'Do not have permissions' });
        next();
    }
});
apiRoutes.post('/changePassword', UserController.changePassword);
apiRoutes.route('/profile')
    .post(UserController.updateProfile)
    .get(UserController.getProfile);
apiRoutes.route('/address')
    .get(UserController.fetchAddresses)
    .post(UserController.addAddress);
apiRoutes.route('/address/:id').delete(UserController.deleteAddress);
apiRoutes.route('/address/fetch/:id').get(UserController.fetchAddress);
apiRoutes.route('/count-notice').get(NotificationController.fetchNew);
apiRoutes.route('/new-notice').get(NotificationController.fetchLatest);

apiRoutes.get('/*', defaultHandler);

export default apiRoutes;

// Default handler for unknown routes
function defaultHandler (req, res) {
    res.status(404).send('Unknown API endpoint');
}
