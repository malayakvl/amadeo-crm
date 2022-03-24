import pool from './connect.js';
import { logger } from '../../common/logger.js';
import MSPClient from '@multisafepay/api-wrapper';

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

    async fetchShippingMethodsByCountry(orderId, countryId, checkFreeShipping = false) {
        const client = await pool.connect();

        let shippingMethods = null;
        let error = null;

        try {
            let query = 'SELECT is_free FROM data.get_shipping_is_free($1)';
            let res = checkFreeShipping && (await client.query(query, [orderId])).rows[0].is_free;

            if (res) {
                shippingMethods = []
            } else {
                query = 'SELECT id, name, price, image, status FROM data.get_shipping_by_country($1, $2) ORDER BY price ASC';
                res = await client.query(query, [orderId, countryId]);
                shippingMethods = res.rows;
            }

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
    
    async checkoutSubmit(data) {
        try {
            console.log('CHECKOUT FORM DATA', data);
            // const multiSafePayClient = new MSPClient(apiKey, { environment: 'test' });
            const multiSafePayClient = new MSPClient('e142b8a6c282eae7130a5a417e899eff4c66b3de', { environment: 'test' });
    
            const dataMerchant =  await multiSafePayClient.orders.create({
                type: 'redirect',
                order_id: "my-order-id-1",
                gateway: 'iDEAL',
                currency: 'EUR',
                amount: '1000',
                description: 'Test Order Description',
                payment_options: {
                    notification_url:
                        'http://www.example.com/client/notification?type=notification',
                    redirect_url:
                        'http://www.example.com/client/notification?type=redirect',
                    cancel_url: 'http://www.example.com/client/notification?type=cancel',
                    close_window: '',
                },
                customer: {
                    locale: 'en_US',
                },
                second_chance: {
                    send_email: true,
                },
            });
    
            return {redirectUrl: dataMerchant.data.payment_url}
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const error = {
                code: 500,
                message: e.message
            };
            return {
                redirectUrl: 'https://testpayv2.multisafepay.com/connect/827vbNQNNUvma3T1JrB3ZanahymNIVRozBB/?lang=en_GB', error: error}
        }
    }
}

export default new Checkout();
