import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Country {
    async getAll () {
        const client = await pool.connect();
        try {
            const query = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'countries\', \'id\', \'nicename\');';
            const res = await client.query(query);
            return res.rows.length ? res.rows[0].table_translation : null;
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
}

export default new Country();
