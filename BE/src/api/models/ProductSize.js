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
        const connect = await pool.connect()
        const result = await connect.query(query, [name])

        if (result.rowCount > 0) {
            return result.rows[0]

        }

        return false
        // const query = `SELECT * FROM ${this._table} WHERE name = $1`
        // return pool.connect()
        //     .then(client => client.query(query, [name]))
        //     .then(result => result.rowCount ? result.rows[0] : false)

    }

}