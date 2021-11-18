import * as express from 'express';
import TestController from '../controllers/TestController.js';
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


apiRoutes.get('/*', defaultHandler);

export default apiRoutes;

// Default handler for unknown routes
function defaultHandler (req, res) {
    res.status(404).send('Unknown API endpoint');
}
