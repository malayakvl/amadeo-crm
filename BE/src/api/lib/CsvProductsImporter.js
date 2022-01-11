import { parse } from 'csv-parse/sync';
import fs from 'fs';
import pool from '../models/connect.js';

export default class CsvProductsImporter {
    /**
     * @property {string}
     * @private
     */
    _file

    /**
     * @property {object}
     * @private
     */
    _user

    /**
     * @param {object} value 
     */
    set user(value) {
        this._user = value

    }

    /**
    * @param {string} value 
    */
    set file(value) {
        this._file = value

    }

    /**
     * @private
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {string[]} photos 
     * @param {string[]} tags 
     * @param {boolean} publish 
     */
    async _create(name, description, photos, tags, publish) {
        const client = await pool.connect()

        let query = `
            INSERT INTO data.products
            (name, description, tags, photos, publish, configured, user_id )
            VALUES (
                '${name}',
                '${description}',
                '${tags}',
                '${photos}',
                '${publish}',
                '${false}',
                '${this._user.user_id}'
            )
        `

        await client.query(query);

    }

    /**
     * @private
     * 
     * @param {number} id
     * @param {string} name 
     * @param {string} description 
     * @param {string[]} photos 
     * @param {string[]} tags 
     * @param {boolean} publish 
     */
    async _update(id, name, description, photos, tags, publish) {
        const client = await pool.connect()

        let query = `
            UPDATE data.products SET
                name = '${name}',
                description = '${description}', 
                tags = '${tags}', 
                photos ='${photos}',
                publish = '${publish}',
                configured =  '${false}',
                user_id = '${this._user.id}'
            WHERE id = ${id} AND user_id = ${this._user.id};
        `

        await client.query(query);

    }

    /**
     * @return {object[]}
     */
    parse() {
        const fileContent = fs.readFileSync(this._file, 'utf-8')

        let rows = parse(fileContent, { columns: true })
        let products = []

        let nextIndex = 0

        rows.forEach((row, index1) => {
            if (nextIndex !== index1) {
                return

            }

            let nextRow = rows[(1 + index1)]

            if (nextRow && !nextRow.product_name) {
                const nextRows = rows.slice((1 + index1))
                row.options = []

                nextRows.every((optionRow, index2) => {
                    row.options.push(optionRow)

                    let nextRow = nextRows[(1 + index2)]

                    if (nextRow && nextRow.product_name) {
                        nextIndex = ((index1 + 1) + (index2 + 1))
                        return false

                    }

                    return true

                })

            }

            products.push(row)

        })

        return products

    }

    save() {
        let products = this.parse()
        return
    }
}