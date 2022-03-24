import pool from './connect.js';
import { logger } from '../../common/logger.js';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_API_KEY);

class PaymentPlan {
    async fetchItems () {
        const client = await pool.connect();
        try {
            const query = 'SELECT fields_json FROM data.get_subscription_plans_to_options_list();';
            const res = await client.query(query);
            return res.rows.length ? res.rows[0].fields_json : [];
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } finally {
            client.release();
        }
    }
    
    async changeStatus(data) {
        const client = await pool.connect();
        try {
            const query = `UPDATE data.subscription_plans_to_options SET value= NOT value WHERE option_id=${data.optionId} AND plan_id=${data.planId}`;
            await client.query(query);
            
            return { success: true };
            // const res = await client.query(query);
            // return res.rows.length ? res.rows[0].fields_json : [];
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } finally {
            client.release();
        }
    }
    
    async fetchInfo(planId) {
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.subscription_plans WHERE id=${planId}`;
            const res = await client.query(query);
            if (res.rows.length > 0) {
              if (res.rows[0].stripe_id) {
                  const price = await stripe.prices.retrieve(
                      res.rows[0].stripe_id
                  );
                  res.rows[0].stripeInfo = price;
                  return { success: true, planInfo: res.rows[0] };
              } else {
                  return { success: false, planInfo: null };
              }
            } else {
                return { success: false, planInfo: null };
            }
            
            // const res = await client.query(query);
            // return res.rows.length ? res.rows[0].fields_json : [];
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } finally {
            client.release();
        }
    }
    
    async syncPrices(data, sripeProducts, stripePrices) {
        console.log('DATA', data);
        const client = await pool.connect();
        try {
            const query = `SELECT * FROM data.subscription_plans`;
            const res = await client.query(query);
            const promisesQuery = [];
            if (res.rows.length) {
                res.rows.forEach(plan => {
                    if (data[`plan_stripe_${plan.id}`]) {
                        const price = (stripePrices.data.filter(price => price.product === data[`plan_stripe_${plan.id}`]));
                        if (price.length) {
                            promisesQuery.push(client.query(`UPDATE data.subscription_plans SET stripe_id='${price[0].id}' WHERE id=${plan.id}`));
                        }
                        // console.log(data[`plan_stripe_${plan.id}`], `price:${stripePrices.data.filter(price => price.product === data[`plan_stripe_${plan.id}`])}`);
                    }
                });
                await Promise.all(promisesQuery);
                return { success: true };
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Country Not found' } };
        } finally {
            client.release();
        }
    }
}

export default new PaymentPlan();
