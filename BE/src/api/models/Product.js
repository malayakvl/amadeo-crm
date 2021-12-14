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
            const colors = dataProduct.colors;
            const sizes = dataProduct.sizes;
            delete dataProduct.colors;
            delete dataProduct.sizes;

            const queryInsert = `
                INSERT INTO data.products
                    (name, price, description, keywords, quantity, photos, publish )
                VALUES (
                    '${dataProduct.name}',
                    ${dataProduct.price},
                    '${dataProduct.description}',
                    '${dataProduct.keyword}',
                    ${dataProduct.quantity},
                    '{${dataProduct.photos}}',
                    ${dataProduct.publish ? dataProduct.publish : true}
                ) RETURNING id;`;
            const resProduct = await client.query(queryInsert);
            const promisesQueries = [];
            if (colors) {
                JSON.parse(colors).forEach(color => {
                    promisesQueries.push(this.addColor(resProduct.rows[0].id, color.value));
                });
            }
            if (sizes) {
                JSON.parse(sizes).forEach(size => {
                    promisesQueries.push(this.addSize(resProduct.rows[0].id, size.value));
                });
            }
            if (promisesQueries.length > 0) {
                await Promise.all(promisesQueries);
            }

            return { success: true };
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
