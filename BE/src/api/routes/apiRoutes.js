import * as express from 'express';
import TestController from '../controllers/TestController.js';
import UserController from '../controllers/UserController.js';
import PageController from '../controllers/PageController.js';
import CountryController from '../controllers/CountryController.js';
import NotificationController from '../controllers/NotificationController.js';
import ProductController from '../controllers/ProductController.js';
import TagController from '../controllers/TagController.js';
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
    .post(UserController.saveAddress);
apiRoutes.route('/fetch-notifications').get(NotificationController.fetchData);
apiRoutes.route('/count-notice').get(NotificationController.fetchNew);
apiRoutes.route('/new-notice').get(NotificationController.fetchLatest);

apiRoutes.route('/product')
    .post(ProductController.addProduct);
apiRoutes.route('/products/fetch-additional').get(ProductController.fetchAdditional);
apiRoutes.route('/fetch-product/:id').get(ProductController.fetchProduct);
apiRoutes.route('/fetch-products').get(ProductController.fetchData);
apiRoutes.route('/products/copy/:id').get(ProductController.copyRow);
apiRoutes.route('/products/delete/:id').delete(ProductController.deleteRow);
apiRoutes.route('/products/photo-delete/:id').post(ProductController.deletePhoto);
apiRoutes.route('/products/bulk-delete').post(ProductController.bulkDelete);
apiRoutes.route('/products/bulk-copy').post(ProductController.bulkCopy);

apiRoutes.route('/tags/find').get(TagController.fetchTags);

apiRoutes.get('/*', defaultHandler);

export default apiRoutes;

// Default handler for unknown routes
function defaultHandler (req, res) {
    res.status(404).send('Unknown API endpoint');
}
