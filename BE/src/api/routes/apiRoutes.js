import * as express from 'express';
import TestController from '../controllers/TestController.js';

// import userModel from '../models/User.js';
// import { getTokensAndSetCookies } from '../lib/token.js';
// import jwt from 'jsonwebtoken';
// import { logger } from '../../common/logger.js';
const apiRoutes = express.Router();

// apiRoutes.route('/webhook')
//     .post(express.raw({ type: 'application/json' }), SubscriptionController.webhookHandler);

apiRoutes.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

apiRoutes.route('/test')
    .get(TestController.testData);



/* ================= start auth api routes ======================== */
// apiRoutes.use((req, res, next) => {
//     passport.authenticate('jwt', {
//         session: false
//     }, (err, user, info) => {
//         if (err) {
//             res.status(500).json({ code: 500, message: err.message });
//             // eslint-disable-next-line no-undef
//             return next(err || 'Something went wrong');
//         }
//         if (info) {
//             if (info.name === 'TokenExpiredError' || info.message === 'jwt expired') {
//                 const { cookies: { rt } } = req;
//                 try {
//                     const secret = process.env.LOGIN_TOKEN_SECRET_REFRESH;
//                     const decoded = jwt.verify(rt, secret);
//                     const { id, exp } = decoded;
//                     async function restoreUser (id) {
//                         return await userModel.findUserById(id);
//                     }
//                     restoreUser(id).then(user => {
//                         if (exp * 1000 - Date.now() > 0) {
//                             getTokensAndSetCookies(req, res, user.id, user.email);
//                             req.user = user;
//                             next();
//                         } else {
//                             res.status(401).json({ code: 401, message: info.message });
//                             next();
//                         }
//                     });
//                 } catch (e) {
//                     if (process.env.NODE_ENV === 'development') {
//                         logger.log(
//                             'error',
//                             'Model error:',
//                             { message: e.message }
//                         );
//                     }
//                     res.status(401).json({ code: 401, message: info.message });
//                     next('route');
//                 }
//             } else {
//                 res.status(401).json({ code: 401, message: info.message });
//                 next('route');
//             }
//         }
//         if (!err && !info) {
//             req.user = user;
//             next();
//         }
//     })(req, res, next);
// });
//
// apiRoutes
//     .get('/:msa/saveFilter', checkIsInRole('admin', 'user'), checkMSA(), mapController.searchFilter);
//
// apiRoutes
//     .get('/:msa/retrieve-filter', checkIsInRole('admin', 'user'), checkMSA(), mapController.getFilter);
//
// apiRoutes
//     .get('/map/:msa', checkIsInRole('admin', 'user'), checkMSA(), mapController.getMVT);
//
// apiRoutes
//     .get('/mvt/:msa/:layer/:z/:x/:y', checkMSA(), layerController.getMVT);
//
// apiRoutes
//     .get('/:msa/counties', checkMSA(), countyController.getAll);
//
// apiRoutes
//     .get('/:msa/counties-filter', checkMSA(), countyController.getAllForFilter);
//
// apiRoutes
//     .get('/:msa/street', checkMSA(), streetController.search);
//
// apiRoutes
//     .get('/:msa/filter-street', checkMSA(), streetController.searchFilter);
//
// apiRoutes
//     .get('/:msa/cpi', checkMSA(), cpiController.search);
//
// apiRoutes
//     .get('/:msa/sprc', checkMSA(), sprcController.search);
//
// apiRoutes
//     .get('/:msa/zoning', checkMSA(), zoningController.search);
//
// apiRoutes
//     .get('/:msa/zoning-district', checkMSA(), zoningController.searchDistrict);
//
// apiRoutes
//     .get('/:msa/zoning-status', checkMSA(), zoningController.searchStatus);
//
// apiRoutes
//     .get('/:msa/city', checkMSA(), cityController.search);
//
// apiRoutes
//     .get('/:msa/zip', checkMSA(), cityController.zipSearch);
//
// apiRoutes
//     .get('/:msa/city-limit-jurisdiction', checkMSA(), jurisdictionController.getList);
//
// apiRoutes
//     .get('/:msa/education', checkMSA(), educationController.search);
//
// apiRoutes
//     .get('/:msa/mls', checkMSA(), mlsController.search);
//
// apiRoutes
//     .get('/:msa/owner', checkMSA(), propertyController.searchOwner);
//
// apiRoutes
//     .get('/:msa/floodplain-fd', checkMSA(), floodplainFDController.search);
//
// apiRoutes
//     .get('/:msa/floodplain', checkMSA(), floodplainController.search);
//
// apiRoutes
//     .get('/:msa/elevation', checkMSA(), layerController.getElevation);
//
// apiRoutes
//     .get('/:msa/address/', checkMSA(), addressController.search);
//
// apiRoutes
//     .get('/:msa/opportunity/', checkMSA(), opportunityController.search);
//
// apiRoutes
//     .get('/:msa/affordable/', checkMSA(), affordableController.search);
//
// apiRoutes
//     .get('/:msa/property-id', checkMSA(), propertyController.search);
//
// apiRoutes
//     .get('/:msa/filterParcels', checkMSA(), propertyController.filter);
//
// apiRoutes
//     .get('/:msa/filterProperty', checkMSA(), propertyController.filterProperty);
//
// apiRoutes
//     .get('/:msa/filterExport', checkMSA(), propertyController.filterExport);
//
// apiRoutes
//     .get('/:msa/filterCountProperty', checkMSA(), propertyController.filterCountProperty);
//
// apiRoutes
//     .get('/:msa/subdivision', checkMSA(), subdivisionController.search);
//
// apiRoutes
//     .post('/:msa/getFeaturesByLatLng', checkMSA(), layerController.getFeaturesByLatLng);
//
// apiRoutes
//     .get('/:msa/layers/legend', checkMSA(), layerController.getLegend);
//
// apiRoutes
//     .get('/:msa/layers/render', checkMSA(), layerController.getRender);
//
// apiRoutes
//     .post('/:msa/getFeaturesArrayByLatLng', checkMSA(), layerController.getFeaturesArrayByLatLng);
//
// apiRoutes.route('/promo-codes/bulk-delete/:ids')
//     .get(checkIsInRole('admin'), couponController.bulkDelete);
//
// apiRoutes.route('/promo-codes')
//     .get(checkIsInRole('admin'), couponController.indexPromo)
//     .post(checkIsInRole('admin'), couponController.createPromo);
//
// apiRoutes.route('/promo-codes/:id')
//     .put(couponController.updatePromo)
//     .delete(checkIsInRole('admin'), couponController.deletePromo);
//
// apiRoutes.route('/coupons')
//     .get(checkIsInRole('admin'), couponController.index)
//     .post(checkIsInRole('admin'), couponController.create);
//
// apiRoutes.route('/users')
//     .get(checkIsInRole('admin'), userController.index)
//     .post(checkIsInRole('admin'), userController.create);
//
// apiRoutes.route('/users/change-status/:id')
//     .get(checkIsInRole('admin'), userController.changeStatus);
//
// apiRoutes.route('/users/bulk-delete/:ids')
//     .get(checkIsInRole('admin'), userController.bulkDelete);
//
// apiRoutes.route('/users/:id')
//     .get(userController.detail)
//     .put(userController.update)
//     .patch(userController.resetPassword)
//     .delete(checkIsInRole('admin'), userController.delete);
//
// apiRoutes.route('/users/:id/msa/:msa_id')
//     .post(checkIsInRole('admin'), userController.addMsaToUser);
//
// apiRoutes.route('/users/:id/msa/:name')
//     .delete(checkIsInRole('admin'), userController.deleteMsaFromUser);
//
// apiRoutes.route('/get-subscription/:customerId')
//     .get(SubscriptionController.getSubscription);
//
// apiRoutes.route('/update-subscription')
//     .post(SubscriptionController.updateSubscription);
//
// apiRoutes.route('/roles')
//     .get(checkIsInRole('admin'), roleController.index);
//
// apiRoutes.route('/feedback/bulk-delete/:ids')
//     .get(checkIsInRole('admin'), feedbackController.bulkDelete);
//
// apiRoutes.route('/feedback')
//     .get(feedbackController.index)
//     .post(feedbackController.create);
//
// apiRoutes.route('/customers/:customer_id/subscriptions/:subscription_id')
//     .delete(SubscriptionController.unsubscribe)
//     .put(SubscriptionController.resubscribe);
//
// apiRoutes.route('/customers/:customer_id/cards')
//     .get(SubscriptionController.cardsList);
//
// apiRoutes.route('/cards/:paymentMethod_id')
//     .post(SubscriptionController.cardUpdate)
//     .delete(SubscriptionController.cardDelete);
//
// apiRoutes.route('/create-setup-intent')
//     .post(SubscriptionController.createSetupIntent);
//
// apiRoutes.route('/test')
//     .get(SubscriptionController.test);
//
// apiRoutes.get('/*', defaultHandler);

export default apiRoutes;

// Default handler for unknown routes
function defaultHandler (req, res) {
    res.status(404).send('Unknown API endpoint');
}
