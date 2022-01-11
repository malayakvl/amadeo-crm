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
     * @param {object[]}
     * @return {object[]}
     */
    _formatCsvRows(rows) {
        let formatedRows = []
        let nextPositionIndex = 0

        rows.forEach((row, rowIndex) => {
            if (nextPositionIndex !== rowIndex) {
                return

            }

            const productRow = row
            const nextRowIndex = (1 + rowIndex)
            const nextRow = rows[nextRowIndex]

            productRow.optionRows = []
            
            //Check if next row exists or isn't option row 
            if (!nextRow || nextRow.product_name) {
                formatedRows.push(productRow)
                return

            }

            const rowsAfterProductRow = rows.slice(nextRowIndex)
            const startOptionsIndex = nextRowIndex

            rowsAfterProductRow.every((optionRow, optionIndex) => {
                productRow.optionRows.push(optionRow)

                const nextOptionRowIndex = (1 + optionIndex)
                const nextRow = rowsAfterProductRow[nextOptionRowIndex]

                if (!nextRow) {
                    return false

                }

                //Check if next row is option row
                if (!nextRow.product_name) {
                    return true

                }

                nextPositionIndex = (startOptionsIndex + nextOptionRowIndex)

                return false

            })


            formatedRows.push(row)

        })

        return formatedRows

    }

    save() {
        const fileContent = fs.readFileSync(this._file, 'utf-8')
        const rows = parse(fileContent, { columns: true })

        let productRows = this._formatCsvRows(rows)
        return
    }
}