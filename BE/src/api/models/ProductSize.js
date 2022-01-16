import pool from './connect.js';

export default class ProductSize {
    /**
     * @private
     */
    _table = 'data.product_sizes'

    /**
     * @param {string} name
     * @return {object}
     */
    async findByName(name) {
        const query = `SELECT * FROM ${this._table} WHERE name = $1`
        const client = await pool.connect()
        const result = await client.query(query, [name])
        client.release()
        
        if (result.rowCount > 0) {
            return result.rows[0]

        }

        return false

    }

}