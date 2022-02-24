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
            if (!column && !sort) {
            
            } else {
            
            }
            const ordersQuery = `SELECT
                                    id, email, first_name, last_name, company_name, phone, full_address, photo, created_at, total_count, total_buyers, total_amount
                                 FROM data.get_sellers (${perPage}, ${offset}, NULL, 'total_count DESC');`;
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
            const countries = await client.query('SELECT * FROM data.get_orders_countries();');
            res.countries = countries.rows[0].countries ? countries.rows[0].countries : [];
            // const amounts = await client.query('SELECT * FROM data.get_orders_total_amount_range();');
            // res.amounts = amounts.rows[0].total_amount_range.min ? [amounts.rows[0].total_amount_range.min, amounts.rows[0].total_amount_range.max] : [];
            res.amounts = [];
            res.total_orders = [];
            res.total_buyers = [];
            res.total_sessions = [];
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
