import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Shipping {
    async getAll() {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.shipping`
            const res = await client.query(query);
            return res.rows.length ? res.rows : null;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Shippings Not found' } };
        } finally {
            client.release();
        }
    }

    async create(name, image) {
        const client = await pool.connect();
        try {
            const queryInsert = 
            `INSERT INTO data.shipping (name, image, status) VALUES ('${name}', '${image}', ${true}) RETURNING id;`;
            const res = await client.query(queryInsert);
            return res.rows[0].id;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model Shipping error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Tags Not found' } };
        } finally {
            client.release();
        }

    }

    async findByName(name) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.shipping WHERE name = '${name}'`;
            const res = await client.query(query);
            return res.rows.length ? res.rows[0] : null
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Shipping Not found' } };
        } finally {
            client.release();
        }

    }
}

export default new Shipping();
