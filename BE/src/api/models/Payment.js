import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Payment {
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
            }console.log('_filters =', _filters);
            const ordersQuery = `SELECT id, payment_id,
                                    total_amount, order_number,
                                    created_at, updated_at,
                                    buyer_first_name, buyer_photo
                                FROM data.get_orders (${perPage}, ${offset}, '${JSON.stringify(_filters)}', 'orders.created_at DESC');`;
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

    async fetchMethods (userId) {
        const client = await pool.connect();

        let methods = null;
        let error = null;

        try {
            const query = 'SELECT fields_json FROM data.get_payments_to_users($1)';
            const res = await client.query(query, [userId]);
            
            methods = res.rows?.[0]?.fields_json?.length > 0 ? res.rows[0].fields_json : [];

        } catch (e) {

            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            error = {
                code: 500,
                message: 'Error get list of payment methods'
            };

        } finally {
            client.release();
            return { methods, error };
        }
    }

    async changeMethodsStatuses(methods, userId) {
        const client = await pool.connect();

        let result = false;
        let error = null;

        try {
            await client.query('BEGIN');

            for (const method of methods) {
                const querySQL = 'UPDATE data.payments_to_users SET status = $1 WHERE payment_id = $2 AND user_id = $3';
                await client.query(querySQL, [method.status, method.payment_id, userId]).querySQL;
            }
            
            await client.query('COMMIT');

            result = true;

          } catch (e) {
            await client.query('ROLLBACK');

            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model Shipping error:',
                    { message: e.message }
                );
            }

            error = {
                code: 500,
                message: 'Error update payment methods status'
            };

          } finally {
            client.release();
            return { result, error };
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
            const amounts = await client.query('SELECT * FROM data.get_orders_total_amount_range()');
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

export default new Payment();
