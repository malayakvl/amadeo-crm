import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Seller {
    async fetchItems (page, perPage = 20, user, isRead = false, reqOffset = null, filters, column, sort) {
        const client = await pool.connect();
        try {
            const _filters = JSON.parse(filters);
            if (user.role_id === 2) {
                _filters.seller_id = [user.id];
                if (_filters.userIds) {
                    _filters.buyer_id = _filters.userIds;
                    delete _filters.userIds;
                }
            }
            // const _total = await client.query(`SELECT count FROM data.get_orders_count('${JSON.stringify(_filters)}');`);
            // const size = _total.rows[0].count;
            const size = 12;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            
            // const ordersQuery = `SELECT country_name, country_iso,
            //                         id, email, first_name, last_name, company_name, phone, full_address, photo, created_at, total_count, total_buyers, total_amount, total_sessions
            //                      FROM data.get_sellers (${perPage}, ${offset}, '${JSON.stringify(_filters)}', 'total_count DESC');`;
            const ordersQuery = `SELECT country_name, country_iso,
                                    id, email, first_name, last_name, company_name, phone, full_address, photo, created_at, total_orders, total_buyers, total_amount, total_sessions
                                 FROM data.get_sellers (${perPage}, ${offset}, '${JSON.stringify(_filters)}', '${column} ${sort}');`;
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
    
    async fetchFilters () {
        const client = await pool.connect();
        try {
            const res = {};
            // const shipping = await client.query('SELECT * FROM data.get_orders_shipping();');
            // res.shippings = shipping.rows[0].shipping ? shipping.rows[0].shipping : [];
            // const payments = await client.query('SELECT * FROM data.get_orders_payments();');
            // res.payments = payments.rows[0].payments ? payments.rows[0].payments : [];
            const countries = await client.query('SELECT * FROM data.get_sellers_countries();');
            res.countries = countries.rows[0].countries ? countries.rows[0].countries : [];
            const amounts = await client.query('SELECT total_amount_range FROM data.get_sellers_total_amount_range();');
            res.amounts = amounts.rows[0].total_amount_range.max ? [amounts.rows[0].total_amount_range.min, amounts.rows[0].total_amount_range.max] : [];
            const sessions = await client.query('SELECT total_sessions_range FROM data.get_sellers_total_sessions_range();');
            res.total_sessions = sessions.rows[0].total_sessions_range.max ? [sessions.rows[0].total_sessions_range.min, sessions.rows[0].total_sessions_range.max] : [];
            const buyer = await client.query('SELECT total_buyers_range FROM data.get_sellers_total_buyers_range();');
            res.total_buyers = buyer.rows[0].total_buyers_range.max ? [buyer.rows[0].total_buyers_range.min, buyer.rows[0].total_buyers_range.max] : [];
            const orders = await client.query('SELECT total_orders_range FROM data.get_sellers_total_orders_range();');
            res.total_orders = orders.rows[0].total_orders_range.max ? [orders.rows[0].total_orders_range.min, orders.rows[0].total_orders_range.max] : [];
            // SELECT total_sessions_range FROM data.get_sellers_total_sessions_range();
            //
            // SELECT total_count_range FROM data.get_sellers_total_count_range();
            //
            // SELECT total_buyers_range FROM data.get_sellers_total_buyers_range();
            //
            // SELECT total_amount_range FROM data.get_sellers_total_amount_range();
            // res.total_orders = [];
            // res.total_buyers = [];
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



export default new Seller();
