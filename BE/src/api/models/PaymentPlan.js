import pool from './connect.js';
import { logger } from '../../common/logger.js';

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
}

export default new PaymentPlan();
