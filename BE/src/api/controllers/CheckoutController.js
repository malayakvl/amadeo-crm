import checkoutModel from '../models/Checkout.js';
import userModel from '../models/User.js';

class CheckoutController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */

    async fetch(req, res) {
        if (!req.user) return res.status(401).json('Access deny');
        
        const { orderNumber } = req.query;

        const orderData = await checkoutModel.fetchOrder(orderNumber, req.user.id);
        const address = await userModel.findUserAddress(req.user.id);
        const shippingMethodsData = await checkoutModel.fetchShippingMethodsByCountry(orderData?.order?.id, address?.country_id);

        return res.status(200).json({
            order: orderData.order,
            address,
            shippingMethods: shippingMethodsData.shippingMethods
        });
    }

    async fetchShippingMethodsByCountry(req, res) {
        if (!req.user) return res.status(401).json('Access deny');

        const { orderId, countryId } = req.query;

        const shippingMethodsData = await checkoutModel.fetchShippingMethodsByCountry(orderId, countryId);

        return res.status(200).json({
            shippingMethods: shippingMethodsData.shippingMethods
        });
    }
}

export default new CheckoutController();