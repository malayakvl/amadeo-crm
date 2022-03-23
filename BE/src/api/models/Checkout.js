import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Checkout {

    async fetchOrder(orderNumber, userId) {
        const client = await pool.connect();

        let order = null;
        let error = null;

        try {
            const filter = JSON.stringify({
                // status: ["payed"],
                buyer_id: userId,
                order_number: orderNumber
            });

            const ordersQuery = `SELECT id, order_items, order_number, order_amount, shipping_amount, total_amount, status FROM data.get_orders (1, 0, '${filter}');`;
            const res = await client.query(ordersQuery);
            order = res.rows.length > 0 ? res.rows[0] : [];

        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Checkout fetchOrder):',
                    { message: e.message }
                );
            }
            error = {
                code: 500,
                message: 'Error get order'
            };

        } finally {
            client.release();
            return {
                order,
                error
            };
        }
    }

    async fetchShippingMethodsByCountry(orderId, countryId) {
        const client = await pool.connect();

        let shippingMethods = null;
        let error = null;

        try {
            const query = 'SELECT id, name, price, image, status FROM data.get_shipping_by_country($1, $2) ORDER BY price ASC';
            const res = await client.query(query, [orderId, countryId]);
            
            shippingMethods = res.rows;

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
                message: 'Error get list of shippingMethods'
            };

        } finally {
            client.release();
            return { shippingMethods, error };
        }
    }
}

export default new Checkout();
