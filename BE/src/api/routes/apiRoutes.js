import * as express from 'express';
import TestController from '../controllers/TestController.js';
import UserController from '../controllers/UserController.js';
import PageController from '../controllers/PageController.js';
const apiRoutes = express.Router();

apiRoutes.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

apiRoutes.route('/post-test')
    .get(TestController.testData);
apiRoutes.route('/post-test')
    .post(TestController.testData);

apiRoutes.route('/profile')
    .post(UserController.updateProfile);
apiRoutes.route('/address/fetch/:id')
    .get(UserController.fetchAddress);
apiRoutes.route('/address/:id')
    .delete(UserController.deleteAddress);
apiRoutes.route('/address/:email')
    .get(UserController.fetchAddresses);
apiRoutes.route('/address/:email')
    .post(UserController.addAddress);
apiRoutes.route('/profile')
    .get(UserController.getProfile);
apiRoutes.route('/upload')
    .post(TestController.uploadFile);

apiRoutes.route('/pages/all')
    .get(PageController.getAll);
apiRoutes.route('/pages')
    .get(PageController.getPage);



apiRoutes.get('/*', defaultHandler);

export default apiRoutes;

// Default handler for unknown routes
function defaultHandler (req, res) {
    res.status(404).send('Unknown API endpoint');
}
