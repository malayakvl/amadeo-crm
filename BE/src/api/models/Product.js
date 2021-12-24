import pool from './connect.js';
import tagModel from "./Tag.js";
import { logger } from '../../common/logger.js';
import fs from 'fs';
import path from 'path';

const copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

class Product {
    async getAdditional () {
        const client = await pool.connect();
        try {
            const queryColors = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_colors\', \'id\', \'name, code\');';
            const querySizes = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_sizes\', \'id\', \'name\');';
            const queryStyles = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_styles\', \'id\', \'name\');';
            const queryMaterials = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_materials\', \'id\', \'name\');';
            const resColors = await client.query(queryColors);
            const resSizes = await client.query(querySizes);
            const resStyles = await client.query(queryStyles);
            const resMaterials = await client.query(queryMaterials);
            return { additional: {
                    colors: resColors.rows.length ? resColors.rows[0].table_translation : null,
                    sizes: resSizes.rows.length ? resSizes.rows[0].table_translation : null,
                    styles: resStyles.rows.length ? resStyles.rows[0].table_translation : null,
                    materials: resMaterials.rows.length ? resMaterials.rows[0].table_translation : null
                }
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }
    
    
    
    async prepareTags(tags) {
        const productTags = [];
        try {
            const promisesTags = [];
            if (tags) {
                JSON.parse(tags).forEach(tag => {
                    if (!tag.id) {
                        promisesTags.push(tagModel.createTag(tag.name));
                    } else {
                        productTags.push(tag.id);
                    }
                });
                const newTagsIds = await Promise.all(promisesTags);
                return productTags.concat(newTagsIds);
            } else return [];
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model Tags error:',
                    { message: e.message }
                );
            }
        }
    }

    async update (dataProduct, userId) {
        const client = await pool.connect();
        try {
            const _resProd = await client.query(`SELECT * FROM data.products WHERE id=${dataProduct.id} AND user_id=${userId}`);
            let photos = [];
            const copyPhotos = [];
            if (_resProd.rows.length) {
                if (_resProd.rows[0].photos) photos = _resProd.rows[0].photos;
                const sourceDir = `${process.env.DOWNLOAD_FOLDER}/tmp`;
                const dirUpload = `${process.env.DOWNLOAD_FOLDER}/products/${dataProduct.id}`;
                const dirDBUpload = `${process.env.DB_DOWNLOAD_FOLDER}/products/${dataProduct.id}`;
                if (!fs.existsSync(dirUpload)) {
                    fs.mkdirSync(dirUpload);
                }
                // copies files to product dir
                if (dataProduct.photos.length > 0) {
                    const promisesPhotos = [];
                    dataProduct.photos.forEach(photo => {
                        promisesPhotos.push(this.copyFiles(sourceDir, dirUpload, photo));
                    });
                    await Promise.all(promisesPhotos);
                    dataProduct.photos.forEach(photo => {
                        copyPhotos.push(`${dirDBUpload}/${photo}`);
                    })
                }
                const productPhotos = photos.concat(copyPhotos);
                
                // prepare tags
                const tags = await this.prepareTags(dataProduct.tags);
                const productTags = _resProd.rows[0].tags ? _resProd.rows[0].tags.concat(tags) : tags;
                
                const queryUpdate = `
                    UPDATE data.products
                    SET
                        name = $$${dataProduct.name}$$,
                        tags = '{${productTags}}',
                        description = $$${dataProduct.description}$$,
                        photos = '{${productPhotos}}',
                        material_id = ${dataProduct.material_id},
                        configured = ${dataProduct.configured ? dataProduct.configured : true},
                        publish = ${dataProduct.publish ? dataProduct.publish : true}
                     WHERE id=${_resProd.rows[0].id};`;
                await client.query(queryUpdate);
                
                // update configuration
                await client.query(`DELETE FROM data.product_configurations WHERE product_id=${_resProd.rows[0].id}`);
                const configs = JSON.parse(dataProduct.configurations);
                if (configs.config) {
                    const promisesQueries = [];
                    configs.config.forEach((configuration, index) => {
                        promisesQueries.push(this.addConfiguration(_resProd.rows[0].id, configuration, configs.configData[[index]]));
                    });
                    await Promise.all(promisesQueries);
                }
    
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }

    async create (dataProduct, userId) {
        const client = await pool.connect();
        try {
            // prepare tags
            const tags = await this.prepareTags(dataProduct.tags);
    
            const queryInsert = `
                INSERT INTO data.products
                    (name, description, tags, photos, publish, configured, material_id, user_id )
                VALUES (
                    $$${dataProduct.name}$$,
                    $$${dataProduct.description}$$,
                    '{${tags}}',
                    '{${dataProduct.photos}}',
                    ${dataProduct.publish ? dataProduct.publish : true},
                    ${dataProduct.configured ? dataProduct.configured : false},
                    ${dataProduct.material_id},
                    ${userId}
                ) RETURNING id;`;
            const resProduct = await client.query(queryInsert);
            
            const sourceDir = `${process.env.DOWNLOAD_FOLDER}/tmp`;
            const dirUpload = `${process.env.DOWNLOAD_FOLDER}/products/${resProduct.rows[0].id}`;
            const dirDBUpload = `${process.env.DB_DOWNLOAD_FOLDER}/products/${resProduct.rows[0].id}`;
            if (!fs.existsSync(dirUpload)) {
                fs.mkdirSync(dirUpload);
            }
            // copies files to product dir
            if (dataProduct.photos.length > 0) {
                const copyPhotos = [];
                const promisesPhotos = [];
                dataProduct.photos.forEach(photo => {
                    promisesPhotos.push(this.copyFiles(sourceDir, dirUpload, photo));
                });
                await Promise.all(promisesPhotos);
                dataProduct.photos.forEach(photo => {
                    copyPhotos.push(`${dirDBUpload}/${photo}`);
                })
                if (copyPhotos.length > 0) {
                    const queryUpdate = `
                        UPDATE data.products
                        SET
                            photos = '{${copyPhotos}}'
                         WHERE id=${resProduct.rows[0].id};`;
                    await client.query(queryUpdate);
                }
            }
    
            // update configuration
            const configs = JSON.parse(dataProduct.configurations);
            if (configs.config) {
                const promisesQueries = [];
                configs.config.forEach((configuration, index) => {
                    promisesQueries.push(this.addConfiguration(resProduct.rows[0].id, configuration, configs.configData[[index]]));
                });
                await Promise.all(promisesQueries);
            }

            return { success: true };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return { success: false, error: { code: 404, message: 'Addresses Not found' } };
        } finally {
            client.release();
        }
    }
    
    async copyFiles(sourceDir, dirUpload, photo) {
        fs.copyFile(`${sourceDir}/${photo}`, `${dirUpload}/${photo}`, (err) => {
            if (err) {
                throw err;
            }
            fs.unlink(`${sourceDir}/${photo}`,function(err){
                if(err) return console.log(err);
            });
        });
    }

    async fetchProduct (id, userId) {
        const client = await pool.connect();
        try {
            const res = await client.query(`SELECT * FROM data.products WHERE user_id=${userId} AND id=${id}`);
            if (res.rows.length) {
                res.rows[0].selectedColors = [];
                res.rows[0].selectedSizes = [];
                res.rows[0].selectedMaterials = [];
                const resConfigs = await client.query(`SELECT * FROM data.product_configurations WHERE product_id=${id}`);
                
                // build configured options
                if (resConfigs.rows.length > 0) {
                    const colors = [];
                    const sizes = [];
                    resConfigs.rows.forEach(config => {
                        if (config.configuration.color_id) {
                            colors.push(config.configuration.color_id);
                        }
                        if (config.configuration.size_id) {
                            sizes.push(config.configuration.size_id);
                        }
                    });
                    let selectedColorsData = [];
                    if (colors.length > 0) {
                        const queryColors = `SELECT table_translation FROM common__tools._get_translation('data', 'product_colors', 'id', 'name, code', ' id IN (${colors.join(',')})');`;
                        const resColor = await client.query(queryColors);
                        selectedColorsData = resColor.rows[0].table_translation;
                    }
                    let selectedSizesData = [];
                    if (sizes.length > 0) {
                        const querySizes = `SELECT table_translation FROM common__tools._get_translation('data', 'product_sizes', 'id', 'name', ' id IN (${sizes.join(',')})');`;
                        const resSize = await client.query(querySizes);
                        selectedSizesData = resSize.rows[0].table_translation;
                    }
                    let selectedMaterialsData = [];
                    if (res.rows[0].material_id) {
                        const queryMaterials = `SELECT table_translation FROM common__tools._get_translation('data', 'product_materials', 'id', 'name', ' id=${res.rows[0].material_id}');`;
                        const resMaterial = await client.query(queryMaterials);
                        selectedMaterialsData = resMaterial.rows[0].table_translation;
                    }
                    if (!res.rows[0].configured) {
                        res.rows[0].sku = resConfigs.rows[0].sku;
                        res.rows[0].price = resConfigs.rows[0].price;
                        res.rows[0].quantity = resConfigs.rows[0].quantity;
                    }
                    let selectedTagsData = [];
                    if (res.rows[0].tags) {
                        const queryTags = `SELECT table_translation FROM common__tools._get_translation('data', 'hashtags', 'id', 'name', ' id IN (${res.rows[0].tags.join(',')})');`;
                        const resTags = await client.query(queryTags);
                        selectedTagsData = resTags.rows[0].table_translation;
                    }
                    res.rows[0].selectedColors = selectedColorsData;
                    res.rows[0].selectedSizes = selectedSizesData;
                    res.rows[0].selectedMaterials = selectedMaterialsData;
                    res.rows[0].selectedTags = selectedTagsData;
                }
                // res.rows[0].configured = resConfigs.rows.length > 0;
                return { product: res.rows[0], configurations: resConfigs.rows };
            } else {
                return { success: false, error: { code: 404, message: 'Product Not found' } };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Product fetch one product):',
                    { message: e.message }
                );
            }
            const products = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                products,
                error
            };
        } finally {
            client.release();
        }
    }

    async getAll (page, perPage = 20, userId, isRead = false, reqOffset = null) {
        const client = await pool.connect();
        try {
            const userIds = [];
            userIds.push(userId);
            // const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'products', 'id', 'user_id=''${userId}'' ');`);
            const _total = await client.query(`SELECT count FROM data.get_products_count('{"user_id": [${userIds.join(',')}]}');`);
            const size = _total.rows[0].count;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const productQuery = `SELECT * FROM data.get_products(${perPage}, ${offset}, '{"user_id": [${userIds.join(',')}]}');`;
            // const res = await client.query(`SELECT * FROM data.get_all_products(${perPage}, ${offset}, 'user_id=''${userId}'' ')`);
            const res = await client.query(productQuery);
            const products = res.rows.length > 0 ? res.rows : [];
            const error = null;

            return {
                products,
                size,
                error
            };
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Products getAll):',
                    { message: e.message }
                );
            }
            const products = null;
            const error = {
                code: 500,
                message: 'Error get list of users'
            };
            return {
                products,
                error
            };
        } finally {
            client.release();
        }
    }

    async addConfiguration (productId, config, configData) {
        const SQL = `INSERT INTO data.product_configurations (product_id, price, quantity, sku, configuration)
                        VALUES (
                            ${productId},
                            ${configData.price},
                            ${configData.qty},
                            '${configData.sku || '' }',
                            '${JSON.stringify(config)}'
                        )`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
            return true;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error Product Configuration:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }

    
    async bulkDelete (productIds, userId) {
        const client = await pool.connect();
        try {
            const SQL = `SELECT * FROM data.products WHERE id IN (${productIds.join(',')}) AND user_id=${userId}`;
            const res = await client.query(SQL);
            if (res.rows.length > 0) {
                res.rows.forEach(product => {
                    const photos = product.photos;
                    if (photos.length > 0) {
                        photos.forEach(photo => {
                            fs.unlink(`${process.env.DOWNLOAD_FOLDER}/${photo.replace('/uploads', '')}`,function(err){
                                if(err) return console.log(err);
                            });
                        })
                    }
                });
                await client.query(`DELETE FROM data.products WHERE id IN (${productIds.join(',')}) AND user_id=${userId}`);
                return true;
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }
    
    async copyProducts(ids) {
        if (ids.length > 0) {
            try {
                console.log('IDS', ids);
                const promisesQueries = [];
                ids.forEach(id => {
                    const _ids = [];
                    _ids.push(id);
                    promisesQueries.push(this.copyProduct(_ids));
                });
                if (promisesQueries.length) {
                    await Promise.all(promisesQueries);
                }
            } catch (e) {
                if (process.env.NODE_ENV === 'development') {
                    logger.log(
                        'error',
                        'Model copyProducts error:',
                        { message: e.message }
                    );
                }
            }
            
        } else {
            return true;
        }
    }
    
    async copyProduct(ids) {
        const client = await pool.connect();
        const SQL = `SELECT * FROM data.copy_products('[${ids.join(',')}]');`;
        console.log(SQL);
        try {
            const res = await client.query(SQL);
            const newIds = res.rows[0].id_json_arr;
            if (newIds.length > 0) {
                const promisesQueries = [];
                newIds.forEach(id => {
                    promisesQueries.push(this.copyPhotos(id));
                });
                if (promisesQueries.length) {
                    await Promise.all(promisesQueries);
                }
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model copyProducts error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }
    
    
    async copyPhotos(productId) {
        const client = await pool.connect();
        const SQL = `SELECT photos FROM data.products WHERE id= ${productId};`;
        try {
            const res = await client.query(SQL);
            const product = res.rows[0];
            if (product.photos.length > 0) {
                // get copyed product id from photos
                const _photo = product.photos[0].split('/');
                copyRecursiveSync(`./public/uploads/products/${_photo[3]}`, `./public/uploads/products/${productId}`);
                const newPhotos = [];
                product.photos.forEach(photo => {
                    newPhotos.push(photo.replace(`products/${_photo[3]}/`, `products/${productId}/`));
                });
                const queryUpdate = `
                    UPDATE data.products
                    SET
                        photos = '{${newPhotos}}'
                     WHERE id=${productId} ;`;
                await client.query(queryUpdate);
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model copyPhotos error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
        
    }
    
    
    async bulkCopy (productIds, userId) {
        const client = await pool.connect();
        const SQL = `SELECT * FROM data.products WHERE id IN (${productIds.join(',')}) AND user_id=${userId}`;
        try {
            const res = await client.query(SQL);
            if (res.rows.length > 0) {
                const promisesQueries = [];
                res.rows.forEach(product => {
                    promisesQueries.push(this.copyProduct(product));
                });
                if (promisesQueries.length) {
                    await Promise.all(promisesQueries);
                }
                return true;
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }
    
    
    // async copyProductOld (product) {
    //     const client = await pool.connect();
    //     try {
    //         const SQL = `INSERT INTO data.products(
    //                    name, description, tags, material_id, configured, photos, publish, user_id
    //                 )
    //                 SELECT name, description, tags, material_id, configured, photos, publish, user_id
    //                 FROM data.products WHERE id=${product.id} AND user_id=${product.user_id} RETURNING id;`;
    //         const resNew = await client.query(SQL);
    //         if (product.photos.length > 0) {
    //             copyRecursiveSync(`./public/uploads/products/${product.id}`, `./public/uploads/products/${resNew.rows[0].id}`);
    //             const newPhotos = [];
    //             product.photos.forEach(photo => {
    //                 newPhotos.push(photo.replace(`products/${product.id}/`, `products/${resNew.rows[0].id}/`));
    //             });
    //             const queryUpdate = `
    //                 UPDATE data.products
    //                 SET
    //                     photos = '{${newPhotos}}'
    //                  WHERE id=${resNew.rows[0].id} ;`;
    //             await client.query(queryUpdate);
    //         }
    //
    //         // copy configuration
    //         const resConfigs = await client.query(`SELECT id FROM data.product_configurations WHERE product_id=${id}`);
    //
    //         // build configured options
    //         if (resConfigs.rows.length > 0) {
    //             const promisesConfigQueries = [];
    //             resConfigs.rows.forEach(conf => {
    //                 promisesConfigQueries.push(this.copyConfiguration(conf.id, resNew.rows[0].id));
    //             });
    //             if (promisesConfigQueries.length) {
    //                 await Promise.all(promisesConfigQueries);
    //             }
    //         }
    //     } catch (e) {
    //         if (process.env.NODE_ENV === 'development') {
    //             logger.log(
    //                 'error',
    //                 'Model error:',
    //                 { message: e.message }
    //             );
    //         }
    //         return null;
    //     } finally {
    //         client.release();
    //     }
    // }
    
    
    // async copyConfiguration (configId, productId) {
    //     const client = await pool.connect();
    //     try {
    //         const SQL = `INSERT INTO data.product_configurations(
    //                    product_id, configuration, price, quantity, sku
    //                 )
    //                 SELECT name, description, tags, material_id, configured, photos, publish, user_id
    //                 FROM data.products WHERE id=${product.id} AND user_id=${product.user_id} RETURNING id;`;
    //         const resNew = await client.query(SQL);
    //         return resNew.rows.id;
    //     } catch (e) {
    //         if (process.env.NODE_ENV === 'development') {
    //             logger.log(
    //                 'error',
    //                 'Model error:',
    //                 { message: e.message }
    //             );
    //         }
    //         return null;
    //     } finally {
    //         client.release();
    //     }
    // }
    
    

    async deletePhoto (productId, userId, photo) {
        const SQL = `SELECT photos FROM data.products WHERE user_id=${userId} AND id=${productId}`;
        const client = await pool.connect();
        try {
            const res = await client.query(SQL);
            const productPhotos = res.rows[0].photos;
            // {uploads/products/4/1639512136725-j3.jpeg,uploads/products/4/1639512136725-j2.jpeg}
            const queryUpdate = `
                    UPDATE data.products
                    SET
                        photos = '{${productPhotos.filter(file => file !== photo)}}'
                     WHERE id=${productId} ;`;
            await client.query(queryUpdate);
            return true;
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error:',
                    { message: e.message }
                );
            }
            return null;
        } finally {
            client.release();
        }
    }
    
    
}

export default new Product();
