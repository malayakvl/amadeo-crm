import livesessionModel from '../models/Livesession.js';

class LivesessionController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems (req, res) {
        const { limit, offset, queryFilter } = req.query;

        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        
        const data = await livesessionModel.getAll(1, limit, req.user.id, offset, queryFilter);
        if (!data.error) {
            return res.status(200).json({ items: data.items, count: data.size });
        } else {
            return res.status(401).json({ error: 'Something wend wrong' });
        }
    }
    
    async getActiveSessions (req, res) {
        const data = await livesessionModel.getAllActive();
        return res.status(200).json({ items: data.result });
    }
    
    async fetchScenarios (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
    
        const data = await livesessionModel.getUserScenarios(req.user.id);
        if (!data.error) {
            return res.status(200).json({ items: data.items });
        } else {
            return res.status(401).json({ error: 'Something wend wrong' });
        }
    }
    
    async fetchItem (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        
        const data = await livesessionModel.fetchOne(req.user.id, req.params.id);
        return res.status(200).json({ item: data.item });
    }

    async deleteRow (req, res) {
        const ids = [];
        ids.push(req.params.id);
    
        await livesessionModel.bulkDelete(ids, req.user.id);
        
        return res.status(200).json({ success: true });
    }
    
    async storeItem(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        if (req.body.id) {
            await livesessionModel.update(req.user.id, req.body);
        } else {
            await livesessionModel.create(req.user.id, req.body);
        }
        return res.status(200).json({ success: true });
    }
    
}

export default new LivesessionController();
