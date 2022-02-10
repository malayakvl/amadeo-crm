import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Order {
    async fetchItems (page, perPage = 20, user, isRead = false, reqOffset = null, filters) {
        const client = await pool.connect();
        try {
            // const sellerIds = [];
            // const buyerIds = [];
            const _filters = JSON.parse(filters);
            console.log(_filters);
            // create main filters for sellet
            if (user.role_id === 2) {
                // sellerIds.push(user.id);
                _filters.seller_id = [user.id];
                if (_filters.userIds) {
                    _filters.buyer_id = _filters.userIds;
                    delete _filters.userIds;
                }
            }
            const _total = await client.query(`SELECT count FROM data.get_orders_count('${JSON.stringify(_filters)}');`);
            const size = _total.rows[0].count;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const ordersQuery = `SELECT id, live_sessions_id, shipping_id, country_id, payment_id, order_amount, discount_amount,
                                    total_amount, order_number, status, created_at, updated_at, seller_id,
                                    seller_first_name, seller_photo, buyer_id,
                                    buyer_first_name, buyer_photo, flag_name, shipping_image, order_items
                                FROM data.get_orders (${perPage}, ${offset}, '${JSON.stringify(_filters)}', 'orders.created_at DESC');`;
            // const _ordersQuery = `SELECT data.orders.*,
            //             data.users.first_name, data.users.photo,
            //             data.countries.iso AS flag_name,
            //             data.shipping.image AS shipping_image
            //         FROM data.orders
            //         LEFT JOIN data.users ON data.users.id = data.orders.user_id
            //         LEFT JOIN data.shipping ON data.shipping.id = data.orders.shipping_id
            //         LEFT JOIN data.countries ON data.countries.id = data.orders.country_id
            //         ORDER BY created_at DESC
            //         ;`;
            console.log(ordersQuery);
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
