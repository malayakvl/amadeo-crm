import paymentPlanModel from '../models/PaymentPlan.js';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_API_KEY);
// const stripe = require("stripe")('sk_test_26PHem9AhJZvU623DfE1x4sd');

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1000;
};

class PaymentPlanController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems (req, res) {
        const items = await paymentPlanModel.fetchItems();
        return res.status(200).json({ items: items });
        // if (!req.user || req.user.role_id !== 3) {
        //     return res.status(401).json('Access deny');
        // } else {
        //     const items = await paymentPlanModel.fetchItems();
        //     return res.status(200).json({ items: items });
        // }
    }
    
    
    async updateStatus(req, res) {
        if (!req.user || req.user.role_id !== 3) {
            return res.status(401).json('Access deny');
        } else {
            await paymentPlanModel.changeStatus(req.body);
            return res.status(200).json({ status: true });
        }
    }
    
    
    async stripeClientSecret(req, res) {
        const { items } = req.body;
        console.log('ITEMS', items);
        console.log('AMOUNT', calculateOrderAmount(items));
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            }
        });
        // console.log(paymentIntent);
    
        return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
}

export default new PaymentPlanController();