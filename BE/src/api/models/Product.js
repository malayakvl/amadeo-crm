import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Product {
    async getAdditional () {
        const client = await pool.connect();
        try {
            const queryColors = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_colors\', \'id\', \'name\');';
            const querySizes = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_sizes\', \'id\', \'name\');';
            const resColors = await client.query(queryColors);
            const resSizes = await client.query(querySizes);
            return {
                colors: resColors.rows.length ? resColors.rows[0].table_translation : null,
                sizes: resSizes.rows.length ? resSizes.rows[0].table_translation : null
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }

    async create (dataProduct) {
        const client = await pool.connect();
        try {
            // const colors = dataProduct.colors;
            // const sizes = dataProduct.sizes;
            delete dataProduct.colors;
            delete dataProduct.sizes;
            console.log(JSON.parse(dataProduct.configurations));

            const queryInsert = `
                INSERT INTO data.products
                    (name, price, description, keywords, quantity, photos, publish )
                VALUES (
                    $$${dataProduct.name}$$,
                    ${dataProduct.price || null},
                    $$${dataProduct.description}$$,
                    '${dataProduct.keyword || null}',
                    ${dataProduct.quantity || null},
                    '{${dataProduct.photos}}',
                    ${dataProduct.publish ? dataProduct.publish : true}
                ) RETURNING id;`;
            const resProduct = await client.query(queryInsert);

            const configs = JSON.parse(dataProduct.configurations);
            if (configs.length) {
                const promisesQueries = [];
                configs.forEach(configuration => {
                    promisesQueries.push(this.addConfiguration(resProduct.rows[0].id, configuration));
                });
                await Promise.all(promisesQueries);
            }

            return { success: true };
            // const promisesQueries = [];
            // if (colors) {
            //     JSON.parse(colors).forEach(color => {
            //         promisesQueries.push(this.addColor(resProduct.rows[0].id, color.value));
            //     });
            // }
            // if (sizes) {
            //     JSON.parse(sizes).forEach(size => {
            //         promisesQueries.push(this.addSize(resProduct.rows[0].id, size.value));
            //     });
            // }
            // if (promisesQueries.length > 0) {
            //     await Promise.all(promisesQueries);
            // }
            //
            // return { success: true };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }

    async getAll (page, perPage = 20, userId, isRead = false, reqOffset = null) {
        const client = await pool.connect();
        try {
            const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'products', 'id', 'user_id=''${userId}'' ');`);
            const size = _total.rows[0].total;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const res = await client.query(`SELECT * FROM data.get_all_products(${perPage}, ${offset}, 'user_id=''${userId}'' ')`);
            const products = res.rows.length > 0 ? res.rows : [];
            const error = null;

            return {
                products,
                size,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Notifications getAll):',
                    { message: e.message }
                );
            }
            const products = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                products,
                error
            };
        } finally {
            client.release();
        }
    }

    async addConfiguration (productId, data) {
        const SQL = `INSERT INTO data.product_configurations (product_id, configuration) VALUES (${productId}, '${JSON.stringify(data)}')`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
            return true;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }

    async addColor (productId, colorId) {
        const SQL = `INSERT INTO data.product2color (product_id, color_id) VALUES (${productId}, ${colorId})`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
            return true;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }

    async addSize (productId, sizeId) {
        const SQL = `INSERT INTO data.product2size (product_id, size_id) VALUES (${productId}, ${sizeId})`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
            return true;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }
}

export default new Product();
