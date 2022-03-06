import orderModel from '../models/Order.js';

class OrderController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems(req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await orderModel.fetchItems(1, limit, req.user, false, offset, queryFilter, column, sort);
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
    
    async generateInvoice (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            // check if file exist, than return true
            const order = await orderModel.generatePdf(req.params.id, req.user.id, req.user);
            return res.status(200).json({ fileName: order.filename, success: true, filebase64: order.fileEncoded });
        }
    }
    
    
    async fetchWaitingList (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await orderModel.fetchWaitingItems(1, limit, req.user, false, offset, queryFilter, column, sort);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }
    
    async createOrders (req, res) {
        await orderModel.createOrders(req.query.sessionId);
        // if (!data.error) {
        //     return res.status(200).json({success: true});
        // } else {
        //     return res.status(401).json({success: false, error: 'Something wend wrong'});
        // }
        return res.status(200).json({success: true, message: 'creating orders'});
    }
}

export default new OrderController();
