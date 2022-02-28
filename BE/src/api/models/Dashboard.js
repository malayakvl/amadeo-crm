import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Dashboard {

    async fetchItems (perPage = 25, reqOffset = null, filters, user, column, sort) {
        const client = await pool.connect();

        let orders = [];
        let buyers = [];
        let totals = [];
        let error = null;

        try {
            const _filters = JSON.parse(filters);

            if (user.role_id === 2) {
                // sellerIds.push(user.id);
                _filters.seller_id = [user.id];
                if (_filters.userIds) {
                    _filters.buyer_id = _filters.userIds;
                    delete _filters.userIds;
                }
            } else if (user.role_id === 1) {
                _filters.buyer_id = [user.id];
            }

            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            // console.log('[Dashboard.fetchItems] _filters =', _filters);

            if (user.role_id !== 1) {
                let querySQL = `SELECT
                        buyer_id, buyer_email, buyer_first_name, buyer_photo, country_iso, country_name, state,
                        post_code, city, address_line_1, address_line_2, total_count, total_amount, order_items
                    FROM data.get_buyers(${perPage}, ${offset}, '${JSON.stringify(_filters)}', 'first_name ASC');`; //'${column} ${sort}'
                // console.log('[Dashboard.fetchItems] buyersQuery = ', querySQL);
                let res = await client.query(querySQL);
                buyers = res.rows.length > 0 ? res.rows : [];
            }    

            const _orderFilters = { ..._filters };
            if (user.role_id === 2) {
                _orderFilters.status = ["payed", "shipped", "canceled"];
            }
            let querySQL = `SELECT
                    id, live_sessions_id, shipping_id, country_id, payment_id, order_amount, discount_amount,
                    total_amount, order_number, status, created_at, updated_at, seller_id,
                    seller_first_name, seller_photo, buyer_id,
                    buyer_first_name, buyer_photo, flag_name, shipping_image, order_items
                FROM data.get_orders(${perPage}, ${offset}, '${JSON.stringify(_orderFilters)}', '${column} ${sort}');`; // 'created_at DESC'
            // console.log('[Dashboard.fetchItems] ordersQuery = ', querySQL);
            let res = await client.query(querySQL);
            orders = res.rows.length > 0 ? res.rows : [];
            
            querySQL = `SELECT dashboard_total FROM data.get_dashboard_total('${JSON.stringify(_filters)}');`;
            // console.log('[Dashboard.fetchItems] totalsQuery = ', querySQL);
            res = await client.query(querySQL);
            totals = res.rows.length > 0 ? res.rows[0].dashboard_total : [];

        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Dashboard getAll):',
                    { message: e.message }
                );
            }
            console.log('[Dashboard.fetchItems] error.message = ', e.message);
            error = {
                code: 500,
                message: 'Error get Dashboard data'
            };

        } finally {
            client.release();
            
            return {
                orders,
                buyers,
                totals,
                error
            };
        }
    }
}

export default new Dashboard();
