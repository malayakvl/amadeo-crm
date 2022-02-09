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
            const data = await orderModel.fetchItems(1, limit, req.user.id, false, offset, queryFilter);
            console.log(data);
            return res.status(200).json({ count: data.size, items: data.items});
        }
        // const data = await chatbotMessageModel.addMessages(req.query.sessionId, req.body);
        // if (!data.error) {
        //     return res.status(200).json({success: true});
        // } else {
        //     return res.status(401).json({success: false, error: 'Something wend wrong'});
        // }
    }
}

export default new OrderController();
