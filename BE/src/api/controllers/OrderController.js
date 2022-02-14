import orderModel from '../models/Order.js';


class OrderController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems(req, res) {
        const { limit, offset, queryFilter } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await orderModel.fetchItems(1, limit, req.user, false, offset, queryFilter);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }
    
    
    async fetchFilters (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const items = await orderModel.fetchFilters();
            return res.status(200).json({ items: items.res });
        }
    }
}

export default new OrderController();
