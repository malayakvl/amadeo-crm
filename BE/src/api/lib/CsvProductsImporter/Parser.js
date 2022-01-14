import { parse } from 'csv-parse/sync';
import ProductColor from '../../models/ProductColor.js';
import ProductSize from '../../models/ProductSize.js'
import Tag from '../../models/Tag.js';

export default class {

    /**
     * @private
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

            const product = this._fetchPropertiesWithValue(row)
            const nextRowIndex = (1 + rowIndex)
            const nextRow = rows[nextRowIndex]

            product.options = []

            //Check if next row exists or isn't option row 
            if (!nextRow || nextRow.product_name) {
                formatedRows.push(product)
                return

            }

            const rowsAfterProductRow = rows.slice(nextRowIndex)
            const startOptionsIndex = nextRowIndex

            rowsAfterProductRow.every((optionRow, optionIndex) => {
                product.options.push(this._fetchPropertiesWithValue(optionRow))

                const nextRowIndex = (1 + optionIndex)
                const nextRow = rowsAfterProductRow[nextRowIndex]

                if (!nextRow) {
                    return false

                }

                //Check if next row is option row
                if (!nextRow.product_name) {
                    return true

                }

                nextPositionIndex = (startOptionsIndex + nextRowIndex)

                return false

            })


            formatedRows.push(product)

        })

        return formatedRows

    }

    /**
    * @param {object} object 
    */
    _fetchPropertiesWithValue(object) {
        let propertiesWithValue = { ...object }

        for (let property in propertiesWithValue) {
            if (!propertiesWithValue[property]) {
                delete propertiesWithValue[property]

            }

        }

        return propertiesWithValue
    }

    /**
     * 
     * @param {string} hashtag 
     * @return {Promise<number[]>}
     */
    async _parseHashtags(hashtags) {
        const withoutLattice = hashtags.replace(/#/g, '')
        const names = parse(withoutLattice, { trim: true })[0]

        let tagsIds = await Promise.all(names.map(async (name) => {
            const hashtag = await Tag.findOrCreate(name)
            return hashtag.id

        }));

        return tagsIds

    }

    /**
     * 
     * @param {string} publish 
     * @return {boolean}
     */
    _parsePublish(publish) {
        return 'TRUE' === publish.toUpperCase()

    }

    /**
     * 
     * @param {string[]} photos 
     */
    _parsePhotos(photos) {
        if (!photos) {
            return []

        }

        return parse(photos, { trim: true })[0]

    }

    /**
     * 
     * @param {object[]} options 
     * @return {Promise<object[]>}
     */
    async _parseOptions(options) {
        const color = new ProductColor()
        const size = new ProductSize()

        let result = await Promise.all(options.map(async (option) => {
            const foundColor = await color.findByName(option.color)
            const color_id = foundColor.id
            const foundSize = await size.findByName(option.size)
            const size_id = foundSize.id
            const price = option.price
            const quantity = option.quantity
            const sku = option.sku

            return { color_id, size_id, price, quantity, sku }

        }));

        return result

    }

    /** 
     * @public
     * @param {string} fileContent
     * @return {Promise<object[]>}
     */
    async proccess(fileContent) {
        const rows = parse(fileContent, { columns: true, trim: true })
        const formatedRows = this._formatCsvRows(rows)

        let products = await Promise.all(formatedRows.map(async (row) => {
            const name = row.product_name
            const description = row.description
            const options = await this._parseOptions(row.options)
            const tags = await this._parseHashtags(row.hashtag)
            const publish = this._parsePublish(row.publish)
            const photos = this._parsePhotos(row.photos)

            return { name, description, options, tags, publish, photos }

        }));

        return products

    }

}