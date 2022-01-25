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
            const query = 'SELECT * FROM data.shipping WHERE name = $1';
            const res = await client.query(query, [name]);
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

    async findById(id) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.shipping WHERE id = $1`;
            const res = await client.query(query, [id]);
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

    async update(id, name, image) {
        const client = await pool.connect();
        try {
            const queryInsert =
                `UPDATE data.shipping SET name = $1, image = $2 WHERE id = $3 RETURNING id`;
            const res = await client.query(queryInsert, [name, image, id]);

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

    async delete(id) {
        const client = await pool.connect();
        try {
            const queryInsert =
                `DELETE FROM data.shipping WHERE id = $1`;
            const res = await client.query(queryInsert, [id]);

            return true;
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
}

export default new Shipping();
