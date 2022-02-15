import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Order {
    async fetchItems (page, perPage = 20, user, isRead = false, reqOffset = null, filters) {
        const client = await pool.connect();
        try {
            // const sellerIds = [];
            // const buyerIds = [];
            const _filters = JSON.parse(filters);
            // create main filters for sellet
            if (user.role_id === 2) {
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
            // console.log(ordersQuery);
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
    
    async fetchFilters () {
        const client = await pool.connect();
        try {
            const res = {};
            const shipping = await client.query('SELECT * FROM data.get_orders_shipping();');
            res.shippings = shipping.rows[0].shipping ? shipping.rows[0].shipping : [];
            const payments = await client.query('SELECT * FROM data.get_orders_payments();');
            res.payments = payments.rows[0].payments ? payments.rows[0].payments : [];
            const countries = await client.query('SELECT * FROM data.get_orders_countries();');
            res.countries = countries.rows[0].countries ? countries.rows[0].countries : [];
            const amounts = await client.query('SELECT * FROM data.get_orders_total_amount_range();');
            res.amounts = amounts.rows[0].total_amount_range.min ? [amounts.rows[0].total_amount_range.min, amounts.rows[0].total_amount_range.max] : [];
            const error = null;
            return {
                res,
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
