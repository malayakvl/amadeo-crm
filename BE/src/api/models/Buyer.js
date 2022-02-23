import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Buyer {

    // async fetchItems(page, perPage = 20, user, isRead = false, reqOffset = null, filters) {
    //     let items = [
    //         {
    //             buyer_first_name: 'Some Full Name 4',
    //             buyer_photo: null,
    //             country_iso: 'us',
    //             country_name: 'USA',
    //             // state,
    //             // post_code,
    //             // city,
    //             // address_line_1,
    //             // address_line_2,
    //             buyer_id: 4,
    //             buyer_email: 'email@email.com',
    //             buyer_phone: '(406) 555-0120',
    //             buyer_address: '3517 W.Gray St.Utica, Pennsylvania 57867',
    //             total_count: '999',
    //             total_amount: '9.845.25',
    //             orders: []
    //         },
    //         {
    //             buyer_first_name: 'Some Full Name 5',
    //             buyer_photo: null,
    //             country_iso: 'us',
    //             country_name: 'USA',
    //             // state,
    //             // post_code,
    //             // city,
    //             // address_line_1,
    //             // address_line_2,
    //             buyer_id: 14,
    //             buyer_email: 'email@email.com',
    //             buyer_phone: '(406) 555-0120',
    //             buyer_address: '3517 W.Gray St.Utica, Pennsylvania 57867',
    //             total_count: '999',
    //             total_amount: '9.845.25',
    //             orders: [
    //                 {
    //                     id: 2,
    //                     live_sessions_id: 15,
    //                     shipping_id: 123,
    //                     country_id: 67,
    //                     payment_id: 1,
    //                     order_amount: '760',
    //                     discount_amount: null,
    //                     total_amount: '932',
    //                     order_number: '09022022-2',
    //                     status: 'payed',
    //                     created_at: '2022-02-09T16:20:19.592Z',
    //                     updated_at: '2022-02-09T16:20:19.592Z',
    //                     seller_id: 4,
    //                     seller_first_name: 'Ladgerda',
    //                     seller_photo: '/uploads/users/4/1639390274193-lagerta.jpeg',
    //                     buyer_id: 14,
    //                     buyer_first_name: 'Vladyslav Zavhorodnii',
    //                     buyer_photo: null,
    //                     flag_name: 'EE',
    //                     shipping_image: '/uploads/shipping/1644234056109-9.gif',
    //                     // order_items: [
    //                     //     {
    //                     //         product_id: 1264,
    //                     //         name: 'Second',
    //                     //         description: '',
    //                     //         previewphoto:
    //                     //             '/uploads/products/1264/1642600690598-15105585243061529002-cr-640x856-70.jpg',
    //                     //         publish: true,
    //                     //         product_configuration_id: 3966,
    //                     //         color_id: 9,
    //                     //         color_name: 'brown',
    //                     //         color_code: '#743F1A',
    //                     //         size_id: 37,
    //                     //         size_name: 'one size',
    //                     //         price: 20,
    //                     //         quantity: 19,
    //                     //         sku: '987654'
    //                     //     },
    //                     //     {
    //                     //         product_id: 1264,
    //                     //         name: 'Second',
    //                     //         description: '',
    //                     //         previewphoto:
    //                     //             '/uploads/products/1264/1642600690598-15105585243061529002-cr-640x856-70.jpg',
    //                     //         publish: true,
    //                     //         product_configuration_id: 3966,
    //                     //         color_id: 9,
    //                     //         color_name: 'brown',
    //                     //         color_code: '#743F1A',
    //                     //         size_id: 37,
    //                     //         size_name: 'one size',
    //                     //         price: 20,
    //                     //         quantity: 19,
    //                     //         sku: '987654'
    //                     //     }
    //                     // ]
    //                 },
    //                 {
    //                     id: 1,
    //                     live_sessions_id: 15,
    //                     shipping_id: 123,
    //                     country_id: 14,
    //                     payment_id: 1,
    //                     order_amount: '380',
    //                     discount_amount: '0',
    //                     total_amount: '476',
    //                     order_number: '09022022-1',
    //                     status: 'payed',
    //                     created_at: '2022-02-09T11:41:07.753Z',
    //                     updated_at: '2022-02-09T11:41:07.753Z',
    //                     seller_id: 4,
    //                     seller_first_name: 'Ladgerda',
    //                     seller_photo: '/uploads/users/4/1639390274193-lagerta.jpeg',
    //                     buyer_id: 26,
    //                     buyer_first_name: 'Кирил Корогод',
    //                     buyer_photo: null,
    //                     flag_name: 'AT',
    //                     shipping_image: '/uploads/shipping/1644234056109-9.gif',
    //                     order_items: [
    //                         {
    //                             product_id: 1264,
    //                             name: 'Second',
    //                             description: '',
    //                             previewphoto:
    //                                 '/uploads/products/1264/1642600690598-15105585243061529002-cr-640x856-70.jpg',
    //                             publish: true,
    //                             product_configuration_id: 3966,
    //                             color_id: 9,
    //                             color_name: 'brown',
    //                             color_code: '#743F1A',
    //                             size_id: 37,
    //                             size_name: 'one size',
    //                             price: 20,
    //                             quantity: 19,
    //                             sku: '987654'
    //                         }
    //                     ]
    //                 }
    //             ]

    //         }
    //     ];


    //     let error = null;

    //     return {
    //         items,
    //         size: items.length,
    //         error
    //     };
    // }

    async fetchItems (page, perPage = 25, user, isRead = false, reqOffset = null, filters, column, sort) {
        const client = await pool.connect();
        try {
            // const sellerIds = [];
            // const buyerIds = [];
            // console.log('filters = ', filters);
            const _filters = JSON.parse(filters);
            // console.log(_filters);
            // create main filters for sellet
            if (user.role_id === 2) {
                // sellerIds.push(user.id);
                _filters.seller_id = [user.id];
                if (_filters.userIds) {
                    _filters.buyer_id = _filters.userIds;
                    delete _filters.userIds;
                }
            }
            const totalQuery = `SELECT count FROM data.get_buyers_count('${JSON.stringify(_filters)}');`;
            const _total = await client.query(totalQuery);
            // console.log(totalQuery);

            const size = _total.rows[0].count;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            // console.log('_filters =', _filters);
            const buyersQuery = `SELECT
                 buyer_id, buyer_email, buyer_first_name, buyer_photo, country_iso, country_name, state,
                 post_code, city, address_line_1, address_line_2, total_count, total_amount, order_items
                 FROM data.get_buyers(${perPage}, ${offset}, '${JSON.stringify(_filters)}', '${column} ${sort}');`;
            // console.log(buyersQuery);
            const res = await client.query(buyersQuery);
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
            console.log('[Buyers.fetchItems] e.message = ', e.message);
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

    async fetchFilters (userId) {
        const client = await pool.connect();
        try {
            const _filters = {
                seller_id: [userId]
            };
            
            // console.log(_filters);
           
            const res = {};
            const countries = await client.query(`SELECT * FROM data.get_buyers_countries('${JSON.stringify(_filters)}');`);
            res.countries = countries.rows[0].countries ? countries.rows[0].countries : [];
            const amounts = await client.query(`SELECT * FROM data.get_buyers_total_amount_range('${JSON.stringify(_filters)}');`);
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

export default new Buyer();
