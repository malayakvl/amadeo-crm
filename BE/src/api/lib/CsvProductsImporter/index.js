import fs from 'fs';
import pool from '../../models/connect.js';
import Product from '../../models/Product.js';
import Parser from './Parser.js'

export default class {
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
     * @public
     * @property {Parser}
     */
    parser

    /**
     * 
     * @param {_file} user 
     * @param {_user} file 
     */
    constructor(user, file) {
        this.parser = new Parser()
        this._user = user
        this._file = file

    }

    /**
     * @private
     * @param {object} product
     * @param {boolean} publish 
     */
    async _create(product) {
        const client = await pool.connect()

        let query = `
            INSERT INTO data.products
            (name, description, tags, photos, publish, configured, user_id )
            VALUES (
                '${product.name}',
                '${product.description}',
                '{${product.tags}}',
                '{${product.photos}}',
                ${product.publish},
                ${false},
                ${this._user.id}
            ) RETURNING id
        `

        const id = (await client.query(query)).rows[0].id;

        for await (let option of product.options) {
            const size_id = option.size_id
            const color_id = option.color_id
            const price = option.price
            const qty = option.quantity
            const sku = option.sku

            Product.addConfiguration(id, { size_id, color_id }, { price, qty, sku })

        }

    }

    /**
     * @private
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

    async save() {
        if (!this._user) {
            throw new Error('User has to be set up')

        }

        if (!this._file) {
            throw new Error('File has to be set up')

        }

        const fileContent = fs.readFileSync(this._file, 'utf-8')
        const products = await this.parser.proccess(fileContent)

        products.forEach(product => this._create(product))
    }
}