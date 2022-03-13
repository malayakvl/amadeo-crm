import paymentPlanModel from '../models/PaymentPlan.js';

class PaymentPlanController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems (req, res) {
        if (!req.user || req.user.role_id !== 3) {
            return res.status(401).json('Access deny');
        } else {
            const items = await paymentPlanModel.fetchItems();
            return res.status(200).json({ items: items});
        }
    }
    
    
    async updateStatus(req, res) {
        if (!req.user || req.user.role_id !== 3) {
            return res.status(401).json('Access deny');
        } else {
            await paymentPlanModel.changeStatus(req.body);
            return res.status(200).json({ status: true});
        }
    }
}

export default new PaymentPlanController();
