import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Order {
    async fetchItems (page, perPage = 20, userId, isRead = false, reqOffset = null, filters) {
        const client = await pool.connect();
        try {
            const userIds = [];
            userIds.push(userId);
            const _filters = JSON.parse(filters);
            _filters.user_id = userIds;
            // const _total = await client.query(`SELECT count FROM data.get_products_count('${JSON.stringify(_filters)}');`);
            // const size = _total.rows[0].count;
            const size = 1;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const ordersQuery = `SELECT data.orders.*,
                        data.users.first_name, data.users.photo,
                        data.countries.iso AS flag_name,
                        data.shipping.image AS shipping_image
                    FROM data.orders
                    LEFT JOIN data.users ON data.users.id = data.orders.user_id
                    LEFT JOIN data.shipping ON data.shipping.id = data.orders.shipping_id
                    LEFT JOIN data.countries ON data.countries.id = data.orders.country_id
                    ORDER BY created_at DESC
                    ;`;
            const res = await client.query(ordersQuery);
            const items = res.rows.length > 0 ? res.rows : [];
            const error = null;
            
            return {
                items,
                size,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Products getAll):',
                    { message: e.message }
                );
            }
            const items = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                items,
                error
            };
        } finally {
            client.release();
        }
    }
}

export default new Order();
