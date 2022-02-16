import paymentModel from '../models/Payment.js';


class PaymentController {
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
            const data = await paymentModel.fetchItems(1, limit, req.user, false, offset, queryFilter);
            return res.status(200).json({ count: data.size, items: data.items});
        }
        // const data = await chatbotMessageModel.addMessages(req.query.sessionId, req.body);
        // if (!data.error) {
        //     return res.status(200).json({success: true});
        // } else {
        //     return res.status(401).json({success: false, error: 'Something wend wrong'});
        // }
    }

    async fetchItem(req, res) {
        const { orderNumber } = req.query;
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const data = await paymentModel.fetchItem(orderNumber, req.user.id);
            return res.status(200).json({ item: data.item});
        }
    }

    async fetchMethods(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const methods = await paymentModel.fetchMethods(req.user.id);
            return res.status(200).json(methods);
        }
    }

    async changeMethodsStatuses(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const methods = req.body.methods;
            await paymentModel.changeMethodsStatuses(methods, req.user.id);

            return res.status(200).json({})
        }
    }
    
    async fetchFilters(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        } else {
            const items = await paymentModel.fetchFilters();
            return res.status(200).json({ items: items.res });
        }
    }
}

export default new PaymentController();
