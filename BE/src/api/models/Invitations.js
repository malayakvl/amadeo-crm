export default class Invitation {
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
                    '${hash}
                )
                ;
            `);

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

}