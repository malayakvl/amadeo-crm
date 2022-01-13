import pool from './connect.js';

export default class Color {
    /**
     * @private
     */
    _table = 'data.product_colors'

    /**
     * @param {string} name
     * @return {object}
     */
    async findByName(name) {
        const query = `SELECT * FROM ${this._table} WHERE name = $1`
        const connect = await pool.connect()
        const result = await connect.query(query, [name])

        if (result.rowCount > 0) {
            return result.rows[0]

        }

        return false

    }

}