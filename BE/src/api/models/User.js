import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from './connect.js';
import { logger } from '../../common/logger.js';

/**
 * User model
 */
class User {
    /**
     * Find user by email
     *
     * @param email - string
     * @param isDeleted - boolean
     * @returns {Promise<any|null>}
     */
    async findUserByEmail (email, isDeleted = false) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM data.users WHERE email = '${email.toLowerCase()}'`);
            if  (res.rows.length) {
                delete res.rows[0].auth_provider_name;
                delete res.rows[0].auth_provider_id;
                return res.rows[0];
            } else {
                return null;
            }
            // return res.rows.length > 0 ? res.rows[0] : null;
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
    
    /**
     * Login or Register user via provider Facebook, Google, etc
     *
     * @param userData - object
     * @returns {Promise<{error: {code: number, message: string}, user: null}|{error: null, user: *}>}
     */
    async provider(userData) {
        const client = await pool.connect();
        try {
            let user;
            user = await this.findUserByEmail(userData.email);
            if (!user) {
                const query = `
                    INSERT INTO data.users (email, auth_provider_name, auth_provider_id, first_name, role_id)
                    VALUES
                    (
                        '${userData.email}',
                        '${userData.provider}',
                        '${userData.providerId}',
                        '${userData.name}',
                        '1'
                    )
                    ;
                `;
                const res = await client.query(query);
                user = res ? await this.findUserByEmail(userData.email) : null;
                if (user) {
                    return { user: user, error: null };
                } else {
                    return { user: null, error: { code: 404, message: 'User Not found' } };
                }
            } else {
                return { user: user, error: null };
            }
        } catch(e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { user: null, error: { code: 404, message: 'User Not found' } };
        } finally {
            client.release();
        }
    }
    
    /**
     * Create user
     *
     * @param userData - object
     * @returns {Promise<{error: {code: number, message: string}, user: null}|{error: null, user: *}>}
     */
    async create(userData) {
        const {
            salt,
            hash
        } = this.setPassword(userData.password);
        const client = await pool.connect();
        try {
            const res = await client.query(`
                INSERT INTO data.users
                (
                    email, password, salt, role_id, first_name, last_name, company_name,
                    phone, vat, identification_number, full_address
                )
                VALUES
                (
                    '${userData.email}',
                    '${hash}',
                    '${salt}',
                    '${userData.role_id}',
                    '${userData.first_name || ''}',
                    '${userData.last_name || ''}',
                    '${userData.company_name || ''}',
                    '${userData.phone || ''}',
                    '${userData.vat || ''}',
                    '${userData.identification_number || ''}',
                    '${userData.full_address || ''}'
                )
                ;
            `);
            const user = res ? await this.findUserByEmail(userData.email) : null;
            if (user) {
                delete user.salt;
                delete user.password;
                return { user: user, error: null };
            } else {
                return { user: null, error: { code: 404, message: 'User Not found' } };
            }
        } catch(e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { user: null, error: { code: 404, message: 'User Not found' } };
        } finally {
            client.release();
        }
    }
    
    /**
     *
     * @param userData - json
     * @returns {Promise<{error: null, user}|{error: {code: number, message: string}, user: null}>}
     */
    async update(userData) {
        const client = await pool.connect();
        try {
            const user = await this.findUserByEmail(userData.email);
            const query = `SELECT common__tools._update_table_by_id('data', 'users', '${JSON.stringify(userData)}', ${user.id});`;
            await client.query(query);
            if (user) {
                return { user: userData, error: null };
            } else {
                return { user: null, error: { code: 404, message: 'User Not found' } };
            }
        } catch(e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { user: null, error: { code: 404, message: 'User Not found' } };
        } finally {
            client.release();
        }
    }
    
    /**
     *
     * @param userId integer
     * @returns {Promise<{addresses: null, error: {code: number, message: string}}|any[]|null>}
     */
    async findUserAddresses(userId) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.addresses WHERE user_id='${userId}';`;
            const res = await client.query(query);
            return res.rows ? res.rows : null;
        } catch(e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { addresses: null, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }
    
    /**
     *
     * @param userId integer
     * @param addressId integer
     * @returns {Promise<{addresses: null, error: {code: number, message: string}}|any|null>}
     */
    async findUserAddress(userId, addressId) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.addresses WHERE id='${addressId}' ORDER BY id DESC;`;
            const res = await client.query(query);
            return res.rows ? res.rows[0] : null;
        } catch(e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { addresses: null, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }
    
    /**
     *
     * @param userId integer
     * @param addressData json object
     * @returns {Promise<{error: {code: number, message: string}, user: null}|{success: boolean}>}
     */
    async addAddress(userId, addressData) {
        const client = await pool.connect();
        let query;
        try {
            if (addressData.id) {
                const addressId = addressData.id;
                delete  addressData.id;
                query = `SELECT common__tools._update_table_by_id('data', 'addresses', '${JSON.stringify(addressData)}', ${addressId});`;
                await client.query(query);
            } else {
                const query = `INSERT INTO data.addresses
                    (
                        user_id, country_id, state, post_code, address_type, city,
                        address_line_1, address_line_2
                    )
                    VALUES
                    (
                        '${userId}',
                        '${addressData.country_id}',
                        '${addressData.state||""}',
                        '${addressData.post_code||""}',
                        '${addressData.address_type||""}',
                        '${addressData.city||""}',
                        '${addressData.address_line_1||""}',
                        '${addressData.address_line_2||""}'
                    )
                ;`;
                await client.query(query);
            }
            return { success: true};
        } catch(e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { user: null, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }
    
    async deleteAddress(addressId) {
        const client = await pool.connect();
        try {
            const query = `DELETE FROM data.addresses WHERE id='${addressId}'`;
            await client.query(query);
            return { success: true};
        } catch(e) {
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
    
    /**
     * Check pasword
     *
     * @param password - string
     * @param salt - string
     * @param hash - string
     * @returns {boolean}
     */
    validatePassword (password, salt, hash) {
        const hashCheck = crypto.pbkdf2Sync(password, salt, 10000, 256, 'sha256').toString('hex');
        return hash === hashCheck;
    }
    
    /**
     * Encode password
     *
     * @param password - string
     * @returns {{salt: string, hash: string}}
     */
    setPassword (password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 256, 'sha256').toString('hex');
        return {
            salt,
            hash
        };
    }

    generateJWT (email, id) {
        const secret = process.env.LOGIN_TOKEN_SECRET;
        const tokenLife = Number(process.env.LOGIN_TOKEN_LIFE);
        return jwt.sign({ email: email, id: id }, secret, { expiresIn: tokenLife });
    }

    generateRefreshToken (id) {
        const secret = process.env.LOGIN_TOKEN_SECRET_REFRESH;
        const tokenLife = Number(process.env.LOGIN_TOKEN_LIFE_REFRESH);
        return jwt.sign({ id: id }, secret, { expiresIn: tokenLife });
    }
}

export default new User();
