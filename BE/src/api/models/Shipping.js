import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Shipping {
    async getAll() {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.shipping ORDER BY id`
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

    async findCountriesById(id) {
        const client = await pool.connect();
        try {
            const res = await client.query(
                'SELECT country_id AS id, price FROM data.shipping_to_country WHERE shipping_id = $1', [id]
            );

            return res.rows;
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

    async saveCountries(userId, shippingId, countries) {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM data.shipping_to_country WHERE user_id = $1 AND shipping_id = $2', [userId, shippingId]);
            countries.forEach((country) => {
                client.query(
                    'INSERT INTO data.shipping_to_country (user_id, shipping_id, country_id, price) VALUES ($1, $2, $3, $4)',
                    [userId, shippingId, country.id, country.price]
                )
            })

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

    async changeStatuses(status) {
        console.log(status)
        const client = await pool.connect();
        try {
            const queryInsert =
                `UPDATE data.shipping SET status = $1 RETURNING id`;
            const res = await client.query(queryInsert, [status]);

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

    async changeStatus(status, shippingId) {
        const client = await pool.connect();
        try {
            const queryInsert =
                `UPDATE data.shipping SET status = $1 WHERE id = $2 RETURNING id`;
            const res = await client.query(queryInsert, [status, shippingId]);

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
}

export default new Shipping();
