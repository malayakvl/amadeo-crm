import pool from './connect.js';
import { logger } from '../../common/logger.js';
import axios from "axios";

class Checkout {

    async fetchOrder(orderNumber, userId) {
        const client = await pool.connect();

        let order = null;
        let error = null;

        try {
            const filter = JSON.stringify({
                // status: ["payed"],
                buyer_id: [userId],
                order_number: orderNumber
            });

            const ordersQuery = `SELECT * FROM data.get_orders(1, 0, '${filter}');`;
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
    
    async checkoutSubmit(data, user) {
        const client = await pool.connect();
        try {
            const orderRes = await client.query(`SELECT * FROM data.orders WHERE order_number='${data.orderNumber}' AND user_id='${user.id}'`);
            if (orderRes.rows.length) {
                console.log('ORDER', orderRes.rows[0]);
                await client.query(`UPDATE data.orders SET
                                        country_id=${data.country_id},
                                        state=$$${data.state}$$,
                                        city=$$${data.city}$$,
                                        post_code=$$${data.post_code}$$,
                                        phone=$$${data.phone}$$,
                                        shipping_address=$$${data.address_line_1}$$
                                        WHERE order_number='${data.orderNumber}' AND user_id='${user.id}'`);
                console.log(data);
                const dataOrder = {
                    type: 'redirect',
                    order_id: `amadeo-order-id-${orderRes.rows[0].id}`,
                    gateway: orderRes.rows[0].total_amount*100,
                    currency: 'EUR',
                    amount: '1',
                    description: `Payment for Order ${data.orderNumber}`,
                    payment_options: {
                        notification_url:
                            `${process.env.APPLICATION_BASE_URL}/payment?type=notification`,
                        redirect_url:
                            `${process.env.APPLICATION_BASE_URL}/payment?type=redirect`,
                        cancel_url: `${process.env.APPLICATION_BASE_URL}/payment?type=cancel`,
                        close_window: true,
                    },
                    // "payment_options":{
                    //     "notification_url":"https://www.example.com/client/notification?type=notification",
                    //     "redirect_url":"https://www.example.com/client/notification?type=redirect",
                    //     "cancel_url":"https://www.example.com/client/notification?type=cancel",
                    //     "close_window":true
                    // },
                    customer: {
                        locale: 'en_US',
                    },
                    affiliate: {
                        "split_payments":[
                            {
                                "merchant":90312708,
                                "percentage":3.5,
                                "description":"Percentage fee"
                            }
                        ]
                    }
                }
    
                const multiSafePayClientRes = await axios
                    .post(`https://testapi.multisafepay.com/v1/json/orders?api_key=e142b8a6c282eae7130a5a417e899eff4c66b3de`, dataOrder, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(async (res) => {
                        console.log(res.data);
                        return {redirectUrl: res.data.data.payment_url, error: null}
                    }).catch(error => {
                        console.log(error);
                        return {redirectUrl: null, error: error.message}
                    });
                return {redirectUrl: multiSafePayClientRes.redirectUrl, error: multiSafePayClientRes.error}
            } else {
                return {redirectUrl: null, error: 'No find order'}
            }
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
                redirectUrl: null, error: error}
        } finally {
            client.release();
        }
    }
}

export default new Checkout();
