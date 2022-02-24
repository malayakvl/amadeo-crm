import sellerModel from '../models/Seller.js';

class SellerController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems(req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user || req.user.role_id !== 3) {
            return res.status(401).json('Access deny');
        } else {
            const data = await sellerModel.fetchItems(1, limit, req.user, false, offset, queryFilter, column, sort);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }
    
    
    async fetchFilters (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const items = await sellerModel.fetchFilters();
            return res.status(200).json({ items: items.res });
        }
    }
    
    async generateInvoice (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            // check if file exist, than return true
            const order = await sellerModel.generatePdf(req.params.id, req.user.id);
            return res.status(200).json({ fileName: order.filename, success: true, filebase64: order.fileEncoded });
        }
    }
    
    
    async fetchWaitingList (req, res) {
        const { limit, offset, queryFilter, column, sort } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await sellerModel.fetchWaitingItems(1, limit, req.user, false, offset, queryFilter, column, sort);
            return res.status(200).json({ count: data.size, items: data.items});
        }
    }
    
    async createOrders (req, res) {
        await sellerModel.createOrders(req.query.sessionId);
        // if (!data.error) {
        //     return res.status(200).json({success: true});
        // } else {
        //     return res.status(401).json({success: false, error: 'Something wend wrong'});
        // }
        return res.status(200).json({success: true, message: 'creating orders'});
    }
}

export default new SellerController();
