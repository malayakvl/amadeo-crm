/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from './connect.js';
import msaModel from './MSA.js';
import resetTokenModel from './ResetToken.js';
import subscriptionModel from './Subscription.js';
import roleModel from './Role.js';
import { ROLE_ADMIN } from '../../common/constants.js';
import { logger } from '../../common/logger.js';

import Stripe from 'stripe';
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class User {
    async findUserByEmail (email, isDeleted = false) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM common.find_user_by_email('${email.toLowerCase()}', ${isDeleted})`);
            return res.rows.length > 0 ? res.rows[0] : null;
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

    async findUserByProvider (providerId, providerName, isDeleted = false) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM common.find_user_by_auth_provider('${providerId}', '${providerName}',  ${isDeleted})`);
            return res.rows.length > 0 ? res.rows[0] : null;
        } catch (e) {
            throw new Error(e);
        } finally {
            client.release();
        }
    }

    async findUserByIdForDelete (id, isDeleted = false) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM common.find_user_by_id(${id}, ${isDeleted}, '3.5 hours')`);
            return res.rows.length > 0 ? res.rows[0] : null;
        } catch (e) {
            throw new Error(e);
        } finally {
            client.release();
        }
    }

    async findUserById (id, isDeleted = false) {
        const client = await pool.connect();
        try {
            // adding time period cuz trialing subscription after end trial date become active with new date period end
            // this time about 3 hours when subscription active, after that, if customer don't update subscription,
            // stripe change status to past_due
            const res = await client.query(`SELECT * FROM common.find_user_by_id(${id}, ${isDeleted}, '3.5 hours')`);
            res.rows[0].subscription_expired = false;
            if (!res.rows[0].vip && res.rows[0].role !== 'admin') {
                // let needToUpdateSubscription = false;
                if (res.rows[0].customer_id && (res.rows[0].subscription_period_left === null || res.rows[0].subscription_period_left < 0)) {
                    try {
                        const subscription = await stripe.customers.retrieve(res.rows[0].customer_id);
                        await client.query(`UPDATE ${process.env.USERS_FOREIGN_SCHEMA}.subscriptions 
                            SET current_period_end = to_timestamp(${subscription.subscriptions.data[0].current_period_end}),
                            updated_at=NOW(),
                            status='${subscription.subscriptions.data[0].status}'
                            WHERE customer_id='${res.rows[0].customer_id}'`);
                        // eslint-disable-next-line eqeqeq
                        if (subscription.subscriptions.data[0].status != 'active') {
                            res.rows[0].subscription_expired = true;
                        }
                    } catch (e) {
                        res.rows[0].subscription_expired = true;
                    }
                } else {
                    if (!['active', 'trialing'].includes(res.rows[0].status)) {
                        res.rows[0].subscription_expired = true;
                    }
                }
            }
            return res.rows.length > 0 ? res.rows[0] : null;
        } catch (e) {
            throw new Error(e);
        } finally {
            client.release();
        }
    }

    async getAll (page) {
        const client = await pool.connect();
        try {
            const _total = await client.query(`SELECT COUNT(id) AS total FROM ${process.env.USERS_FOREIGN_SCHEMA}.users;`);
            const size = _total.rows[0].total;
            const perPage = 8;
            const offset = (Number(page) - 1) * Number(perPage);
            const res = await client.query(`SELECT * FROM common.get_all_users(${perPage}, ${offset})`);
            const users = res.rows.length > 0 ? res.rows : [];
            const error = null;

            // get subscription
            const subscriptionsList = await stripe.subscriptions.list({
                limit: 1000
            });
            return {
                users,
                size,
                subscriptionsList,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const users = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                users,
                error
            };
        } finally {
            client.release();
        }
    }

    async getUser (id) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM ${process.env.USERS_FOREIGN_SCHEMA}.users WHERE id=${id}`);
            const error = null;
            const users = res.rows.length > 0 ? res.rows : [];

            return {
                users,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const users = null;
            const error = {
                code: 500,
                message: 'Error get list of users for mailing'
            };
            return {
                users,
                error
            };
        } finally {
            client.release();
        }
    }

    async checkEmailCode (email, code) {
        const client = await pool.connect();
        try {
            const authUser = await client.query(`SELECT * FROM ${process.env.USERS_FOREIGN_SCHEMA}.users WHERE email='${email}' AND code='${code}'`);
            const error = null;
            let user = null;
            if (authUser.rows.length > 0) {
                authUser.rows[0].is_auth = true;
                user = authUser.rows[0];
            } else {
                const _user = await client.query(`SELECT * FROM common.users_temp 
                    WHERE email='${email}' AND code='${code}'
                    AND expired_at >= NOW()
                `);
                if (_user.rows.length > 0) {
                    await this.create(
                        email, null,
                        '',
                        '',
                        '',
                        3,
                        false,
                        '',
                        ''
                    );
                    const _authUser = await client.query(`SELECT * FROM ${process.env.USERS_FOREIGN_SCHEMA}.users WHERE email='${email}'`);
                    await this.update(_authUser.rows[0].id, { code: _user.rows[0].code, active: true });
                    await client.query(`DELETE FROM common.users_temp WHERE email='${email}'`);
                    _authUser.rows[0].is_auth = false;
                    user = _authUser.rows[0];
                }
            }
            return {
                user,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const users = null;
            const error = {
                code: 500,
                message: 'Error get list of users for mailing'
            };
            return {
                users,
                error
            };
        } finally {
            client.release();
        }
    }

    async sendEmailCode (email) {
        const client = await pool.connect();
        try {
            const code = Math.random().toString(36).substr(2, 9);
            const hash = crypto.randomBytes(20).toString('hex');
            const realUser = await client.query(`SELECT * FROM ${process.env.USERS_FOREIGN_SCHEMA}.users WHERE email='${email}'`);
            let user = null;
            if (realUser.rows.length > 0) {
                const expiredAt = new Date();
                expiredAt.setSeconds(expiredAt.getSeconds() + process.env.EMAIL_VALIDATION_TOKEN_LIFE);
                await this.update(realUser.rows[0].id, { code: code, email_token_hash: hash, email_token_expired_at: expiredAt.toUTCString() });
                realUser.rows[0].code = code;
                realUser.rows[0].hash = hash;
                realUser.rows[0].is_real = true;
                user = realUser.rows[0];
            } else {
                await client.query(`INSERT INTO common.users_temp (email, code, expired_at, hash)
                    VALUES ('${email}', '${code}', now() + '3 hours'::interval, '${hash}')
                    ON CONFLICT (email) DO UPDATE SET
                    (code, expired_at, hash) = (EXCLUDED.code, EXCLUDED.expired_at, EXCLUDED.hash)
                ;`);
                const _user = await client.query(`SELECT * FROM common.users_temp WHERE email='${email}'`);
                _user.rows[0].is_real = false;
                user = _user.rows[0];
            }
            const error = null;
            return {
                user,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const users = null;
            const error = {
                code: 500,
                message: 'Error get list of users for mailing'
            };
            return {
                users,
                error
            };
        } finally {
            client.release();
        }
    }

    async getTrial (status, days) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM common.find_user_by_subscription('${status}', '${days}', false, '3.5 hours');`);
            const error = null;
            const users = res.rows.length > 0 ? res.rows : [];

            return {
                users,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const users = null;
            const error = {
                code: 500,
                message: 'Error get list of users for mailing'
            };
            return {
                users,
                error
            };
        } finally {
            client.release();
        }
    }

    validatePassword (password, salt, hash) {
        const hashCheck = crypto.pbkdf2Sync(password, salt, 10000, 256, 'sha256').toString('hex');
        return hash === hashCheck;
    }

    setPassword (password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 256, 'sha256').toString('hex');
        return {
            salt,
            hash
        };
    }

    async activateByHash (hash) {
        let _user = null;
        let user = null;
        const client = await pool.connect();
        try {
            _user = await resetTokenModel.findTokenByHash(hash, 'email');
            if (_user) {
                const tokenValidated = await resetTokenModel.validateEmailToken(_user.email_token_hash);
                if (tokenValidated.isValid) {
                    await this.update(_user.id, { active: true });
                    user = await this.findUserByEmail(_user.email);
                    user.is_real = true;
                    return {
                        user,
                        error: null
                    };
                } else {
                    return {
                        user: null,
                        error: {
                            code: 400, message: 'Token is invalid'
                        }
                    };
                }
            } else {
                user = await resetTokenModel.findTokenByTempHash(hash, 'email') || null;
                if (user) {
                    await this.create(
                        user.email, null,
                        '',
                        '',
                        '',
                        3,
                        false,
                        '',
                        ''
                    );
                    const _authUser = await client.query(`SELECT * FROM ${process.env.USERS_FOREIGN_SCHEMA}.users WHERE email='${user.email}'`);
                    await this.update(_authUser.rows[0].id, { code: user.code, active: true });
                    _authUser.rows[0].is_real = false;
                    user = _authUser.rows[0];
                    return {
                        user,
                        error: null
                    };
                }
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
                message: 'Error create reset token'
            };
            return {
                user: null,
                error
            };
        }
    }

    async generateResetToken (email, type = 'password') {
        try {
            const user = await this.findUserByEmail(email) || null;
            if (user) {
                const token = await resetTokenModel.create(user.id, type);
                if (token) token.userName = `${user.firstname} ${user.lastname}`;
                return {
                    token,
                    error: null
                };
            } else {
                return {
                    token: null,
                    error: {
                        code: 404,
                        message: 'User Not Found'
                    }
                };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const token = null;
            const error = {
                code: 500,
                message: 'Error create reset token'
            };
            return {
                token,
                error
            };
        }
    }

    async changePassword (hash, password) {
        try {
            const tokenValidated = await resetTokenModel.validateToken(hash);
            if (tokenValidated.isValid) {
                const {
                    user,
                    error
                } = await this.resetPassword(tokenValidated.userId, password);
                if (user) {
                    await resetTokenModel.setTokenUsed(hash);
                    return { user, error };
                } else {
                    return { user, error };
                }
            } else {
                return {
                    user: null,
                    error: {
                        code: 400, message: 'Reset token is invalid'
                    }
                };
            }
        } catch (e) {
            return {
                user: null,
                error: {
                    code: 500,
                    message: 'Error change password'
                }
            };
        }
    }

    async saveFilter(msa, searchParam, searchName, userId) {
        const client = await pool.connect();
        try {
            const msaRes = await msaModel.findMsaBySpecialName(msa);
            await client.query(`INSERT INTO common.users_filters (user_id, msa_id, name, data)
                VALUES ('${userId}', '${msaRes.id}', '${searchName}', '${searchParam}')`);
            const res = await client.query(`SELECT * FROM common.get_users_filters('${userId}', '${msaRes.id}')`);
            return { filters: res.rows, error: null };
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
                message: 'Error retireve user filters'
            };
            return {
                filters: null,
                error
            };
        } finally {
            client.release();
        }
    }

    async getFilter(filterId, userId) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM common.users_filters WHERE user_id='${userId}' AND id='${filterId}'`);
            return { filter: res.rows[0], error: null };
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
                message: 'Error retireve user filters'
            };
            return {
                filters: null,
                error
            };
        } finally {
            client.release();
        }
    }

    async getMsaFilters(userId, msa) {
        const msaRes = await msaModel.findMsaBySpecialName(msa);
        return this.getFilters(userId, msaRes.id);
    }

    async getFilters (userId, msaId) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM common.get_users_filters('${userId}', '${msaId}')`);
            return { filters: res.rows, error: null };
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
                message: 'Error retireve user filters'
            };
            return {
                filters: null,
                error
            };
        } finally {
            client.release();
        }
    }

    async create (
        email,
        password,
        firstname = '',
        lastname = '',
        company = '',
        address = '',
        inputAdmin = '',
        vip = 'false',
        providerId = null,
        providerName = null,
        city = '',
        state = '',
        zip = '',
        phone = ''
    ) {
        const client = await pool.connect();
        const resUserId = await client.query(`SELECT MAX(id) + 1 as max_id FROM ${process.env.USERS_FOREIGN_SCHEMA}.users`);
        const createdUserId = resUserId.rows[0].max_id;
        try {
            const res = await client.query(`
                INSERT INTO ${process.env.USERS_FOREIGN_SCHEMA}.users 
                (id, email, firstname, lastname, password, salt, role_id, company, vip, address, city, state, zip, 
                    phone, reset_token_is_used, should_cache_be_cleared,
                    created_at, updated_at, active ) 
                VALUES (
                '${createdUserId}',
                '${email}', 
                '${firstname}', 
                '${lastname}', 
                NULL, 
                NULL, 
                '${inputAdmin === 1 ? 1 : 3}', 
                '${company || ''}', 
                '${vip || false}', 
                '',
                '${city || ''}',
                '${state || ''}',
                '${zip || ''}',
                '${phone || ''}',
                false,
                false,
                NOW(),
                NOW(),
                true
                );
            `);
            const user = res ? await this.findUserByEmail(email) : null;
            this.generateResetToken(email, 'email');
            if (providerName) {
                await this.update(user.id, { auth_provider_name: providerName, auth_provider_id: providerId });
            }
            // for admin create connection in msa_user
            if (user.role === 'admin' || user.vip) {
                await msaModel.addAllMSAsToUser(user.id);
            }
            if (user) {
                delete user.salt;
                delete user.password;
                return { user: user, error: null };
            } else {
                return { user: null, error: { code: 404, message: 'User Not found' } };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            if (e.detail && e.detail.indexOf('already exists') > -1) {
                if (process.env.NODE_ENV === 'development') {
                    logger.log(
                        'error',
                        'Model error:',
                        { message: `${e.detail} Restoring user in db and updating ....` }
                    );
                }
                const userByEmail = await this.findUserByEmail(email, true); // looking for among deleted user, if find - restore
                if (userByEmail) {
                    const restoredId = await this.restore(userByEmail.id);

                    if (restoredId) {
                        const { user, error } = await this.update(restoredId, {
                            firstname: firstname,
                            lastname: lastname,
                            company: company,
                            role_id: inputAdmin === 1 ? 1 : 3,
                            vip: vip
                        });
                        return { user, error };
                    } else {
                        return { user: null, error: { code: 500, message: 'Error restore user' } };
                    }
                } else {
                    return { user: null, error: { code: 409, message: 'This email has been already used' } };
                }
            } else {
                return { user: null, error: { code: 500, message: 'Error create user' } };
            }
        } finally {
            client.release();
        }
    }

    async update (id, userData) {
        const client = await pool.connect();
        let sendVipEmail, tryToLogin, oldEmail;
        try {
            const userBefore = await this.findUserByIdForDelete(id);
            const query = `SELECT common.update_table_by_id('${process.env.USERS_FOREIGN_SCHEMA}', 'users', '${JSON.stringify(userData)}', ${id});`;

            const res = await client.query(query);
            await client.query(`UPDATE ${process.env.USERS_FOREIGN_SCHEMA}.users SET updated_at=NOW() WHERE id='${id}'`);
            const userAfter = res ? await this.findUserById(id) : null;
            if (userBefore.vip !== userAfter.vip && userAfter.vip) {
                sendVipEmail = true;
                await msaModel.addAllMSAsToUser(id);
            }
            if (userBefore.vip !== userAfter.vip && !userAfter.vip) {
                await msaModel.deleteAllMSAsFromUser(id);
            }
            if (userBefore.email !== userAfter.email) {
                tryToLogin = true;
                oldEmail = userBefore.email;
            }
            const userUpdated = res ? await this.findUserById(id) : null;
            userUpdated.sendVipEmail = sendVipEmail;
            userUpdated.tryToLogin = tryToLogin;
            userUpdated.oldEmail = oldEmail;
            const error = null;

            return { user: userUpdated, error };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            const user = null;
            const error = {
                code: 500,
                message: 'Error update user'
            };
            if (e.detail && e.detail.indexOf('already exists') > -1) {
                error.code = 409;
                error.message = 'This email has been already used';
            }
            return {
                user,
                error
            };
        } finally {
            client.release();
        }
    }

    async bulkDelete (ids) {
        const client = await pool.connect();
        const promisesQueries = [];
        ids.forEach(id => {
            promisesQueries.push(this.delete(id));
        });
        try {
            const res = await Promise.all(promisesQueries);
            const query = 'SELECT * FROM  common.delete_users()';
            await client.query(query);
            const list = [];
            res.forEach(_res => {
                if (_res.error) {
                    list.push({ id: _res.id, email: _res.email, error: _res.error.message });
                }
            });
            return { list: list, error: null };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        };
    }

    async delete (id) {
        const client = await pool.connect();
        try {
            const user = await this.findUserById(id);
            const customerId = user.customer_id || null;
            const userRole = await roleModel.getRoleById(user.role_id);

            if (user && userRole.name === ROLE_ADMIN) {
                return {
                    user: null,
                    id: user.id,
                    email: user.email,
                    error: {
                        code: 409,
                        message: 'Not allowed to delete admin'
                    }
                };
            }
            if (!user) {
                return {
                    user: null,
                    id: user.id,
                    email: user.email,
                    error: {
                        code: 404,
                        message: 'User Not found'
                    }
                };
            }
            if (customerId) {
                const { isActive, error } = await subscriptionModel.isUserHasAnyActiveSubscriptions(customerId);
                if (isActive) {
                    return {
                        user: null,
                        id: user.id,
                        email: user.email,
                        error: {
                            code: 409,
                            message: 'User has active subscriptions'
                        }
                    };
                }
                if (error) {
                    // eslint-disable-next-line eqeqeq
                    if (error.stripeErrorCode != 'resource_missing') {
                        return {
                            user: null,
                            id: user.id,
                            email: user.email,
                            error: error
                        };
                    }
                }
            }
            const query = `UPDATE ${process.env.USERS_FOREIGN_SCHEMA}.users u SET deleted_at=NOW(), updated_at=NOW() where u.id='${id}'`;
            const res = await client.query(query);
            if (res) {
                return { user: user, error: null };
            } else {
                return { user: null, id: user.id, email: user.email, error: { code: 404, message: 'User Not found' } };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return {
                user: null,
                error: {
                    code: 500,
                    message: 'Error delete user'
                }
            };
        } finally {
            client.release();
        }
    }

    async restore (id) {
        const client = await pool.connect();
        try {
            const query = `UPDATE ${process.env.USERS_FOREIGN_SCHEMA}.users u SET deleted_at=null, updated_at=NOW() where u.id='${id}';`;
            const res = await client.query(query);
            return res ? id : null;
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

    async resetPassword (id, password) {
        const client = await pool.connect();
        const {
            salt,
            hash
        } = this.setPassword(password);
        try {
            const query = `UPDATE ${process.env.USERS_FOREIGN_SCHEMA}.users u SET salt='${salt}', password='${hash}', updated_at=NOW() WHERE u.id='${id}' AND u.deleted_at IS NULL;`;
            const res = await client.query(query);
            const user = res ? await this.findUserById(id) : null;

            if (user) {
                return { user: user, error: null };
            } else {
                return { user: null, error: { code: 404, message: 'Not found' } };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { user: null, error: { code: 500, message: 'Error reset password' } };
        } finally {
            client.release();
        }
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

    async saveRefrehToken (userId, token) {
        const client = await pool.connect();
        try {
            await client.query(`UPDATE ${process.env.USERS_FOREIGN_SCHEMA}.users SET reset_token_hash='${token}', updated_at=NOW() WHERE id=${userId};`);
            return token;
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
                message: 'Error create refresh token'
            };
            return {
                user: null,
                error
            };
        } finally {
            client.release();
        }
    }
}

export default new User();
