import { parse } from 'csv-parse/sync';
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

        let tagsIds = []

        for (const name of names) {
            const hashtag = await Tag.findOrCreate(name)
            tagsIds.push(hashtag.id)

        }

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
     */
    _parseOptions(options) {
        options.forEach((option, index) => {
            const color_id = 1
            const size_id = 1
            const price = option.price
            const quantity = option.quantity ? option.quantity : ''
            const sku = option.sku ? option.sku : ''

            options[index] = {color_id, size_id, price, quantity, sku}

        })
        
        return options

    }

    /** 
     * @public
     * @param {string} fileContent
     * @return {Promise<object[]>}
     */
    async proccess(fileContent) {
        const rows = parse(fileContent, { columns: true, trim: true })
        const formatedRows = this._formatCsvRows(rows)

        let products = []

        for (const row of formatedRows) {
            const name = row.product_name
            const description = row.description
            const options = this._parseOptions(row.options)
            const tags = await this._parseHashtags(row.hashtag)
            const publish = this._parsePublish(row.publish)
            const photos = this._parsePhotos(row.photos)

            products.push({ name, description, options, tags, publish, photos })
        }

        return products

    }

}