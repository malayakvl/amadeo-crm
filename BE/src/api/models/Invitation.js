import crypto from 'crypto';
import pool from './connect.js';
import { logger } from '../../common/logger.js';

class Invitation {
    async create(userData) {
        let email = userData.email;
        let role_id = userData.role_id;
        let hash = crypto.randomBytes(20).toString('hex');

        const client = await pool.connect();
        try {
            await client.query(`
                INSERT INTO data.invitations
                (
                    email, 
                    role_id, 
                    hash
                )
                VALUES
                (
                    '${email}',
                    '${role_id}',
                    '${hash}'
                )
                ;
            `);

            const invitation = res ? await this.findUserByEmail(email) : null;
            return { invitation: invitation, error: null };

        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }

            return { user: null, error: { code: 404, message: 'Something went wrong' } };

        } finally {
            client.release();

        }
    }

    async findByEmail(email) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM data.invitations WHERE email = '${email.toLowerCase()}';`);
            if (res.rows.length) {
                return res.rows[0];
                
            } else {
                return null;

            }
            
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }

            throw new Error(e);

        } finally {
            client.release();
        }

    }

    async findByHash(hash) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM data.invitations WHERE hash = '${hash}';`);
            if (res.rows.length) {
                return res.rows[0];
                
            } else {
                return null;

            }
            
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }

            throw new Error(e);

        } finally {
            client.release();
        }

    } 

}

export default new Invitation()
