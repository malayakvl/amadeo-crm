import pool from './connect.js';
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
            const queryColors = 'SELECT table_translation FROM common__tools._get_translation(\'data\', \'product_colors\', \'id\', \'name\');';
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

                const queryUpdate = `
                    UPDATE data.products
                    SET
                        name = $$${dataProduct.name}$$,
                        price = ${dataProduct.price || null},
                        description = $$${dataProduct.description}$$,
                        keywords = $$${dataProduct.keyword || null}$$,
                        quantity = ${dataProduct.quantity || null},
                        photos = '{${productPhotos}}',
                        publish = ${dataProduct.publish ? dataProduct.publish : true}
                     WHERE id=${_resProd.rows[0].id};`;

                await client.query(queryUpdate);
                await client.query(`DELETE FROM data.product_configurations WHERE product_id=${_resProd.rows[0].id}`);
                const configs = JSON.parse(dataProduct.configurations);
                if (configs.length) {
                    const promisesQueries = [];
                    configs.forEach(configuration => {
                        promisesQueries.push(this.addConfiguration(_resProd.rows[0].id, configuration));
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
            // const colors = dataProduct.colors;
            // const sizes = dataProduct.sizes;

            const queryInsert = `
                INSERT INTO data.products
                    (name, price, description, keywords, quantity, photos, publish, user_id )
                VALUES (
                    $$${dataProduct.name}$$,
                    ${dataProduct.price || null},
                    $$${dataProduct.description}$$,
                    $$${dataProduct.keyword || null}$$,
                    ${dataProduct.quantity || null},
                    '{${dataProduct.photos}}',
                    ${dataProduct.publish ? dataProduct.publish : true},
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

            const configs = JSON.parse(dataProduct.configurations);
            if (configs.length) {
                const promisesQueries = [];
                configs.forEach(configuration => {
                    promisesQueries.push(this.addConfiguration(resProduct.rows[0].id, configuration));
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
                const resConfigs = await client.query(`SELECT * FROM data.product_configurations WHERE product_id=${id}`);
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
                        const queryColors = `SELECT table_translation FROM common__tools._get_translation('data', 'product_colors', 'id', 'name', ' id IN (${colors.join(',')})');`;
                        const resColor = await client.query(queryColors);
                        selectedColorsData = resColor.rows[0].table_translation;
                    }
                    let selectedSizesData = [];
                    if (sizes.length > 0) {
                        const querySizes = `SELECT table_translation FROM common__tools._get_translation('data', 'product_sizes', 'id', 'name', ' id IN (${sizes.join(',')})');`;
                        const resSize = await client.query(querySizes);
                        selectedSizesData = resSize.rows[0].table_translation;
                    }
                    res.rows[0].selectedColors = selectedColorsData;
                    res.rows[0].selectedSizes = selectedSizesData;
                }
                res.rows[0].configured = resConfigs.rows.length > 0;
                return { product: res.rows[0], configurations: resConfigs.rows };
            } else {
                return { success: false, error: { code: 404, message: 'Product Not found' } };
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'development') {
                logger.log(
                    'error',
                    'Model error (Notifications getAll):',
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
            const _total = await client.query(`SELECT * FROM common__tools._select_total_from_table_by_where('data', 'products', 'id', 'user_id=''${userId}'' ');`);
            const size = _total.rows[0].total;
            let offset;
            if (reqOffset) {
                offset = reqOffset;
            } else {
                offset = (Number(page) - 1) * Number(perPage);
            }
            const res = await client.query(`SELECT * FROM data.get_all_products(${perPage}, ${offset}, 'user_id=''${userId}'' ')`);
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

    async addConfiguration (productId, data) {
        const SQL = `INSERT INTO data.product_configurations (product_id, price, quantity, configuration)
                        VALUES (
                            ${productId},
                            ${data.price},
                            ${data.qty},
                            '${JSON.stringify(data)}'
                        )`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
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

    async addColor (productId, colorId) {
        const SQL = `INSERT INTO data.product2color (product_id, color_id) VALUES (${productId}, ${colorId})`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
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

    async addSize (productId, sizeId) {
        const SQL = `INSERT INTO data.product2size (product_id, size_id) VALUES (${productId}, ${sizeId})`;
        const client = await pool.connect();
        try {
            await client.query(SQL);
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
                            // fs.unlink(`public/${photo}`,function(err){
                            //     if(err) return console.log(err);
                            // });
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
    
    
    // async copyRecursiveSync (src, dest) {
    //     console.log('AAAAAAAAA');
    //     var exists = fs.existsSync(src);
    //     var stats = exists && fs.statSync(src);
    //     var isDirectory = exists && stats.isDirectory();
    //     if (isDirectory) {
    //         // fs.mkdirSync(dest);
    //         console.log('!!!!', src);
    //         fs.readdirSync(src).forEach(function(childItemName) {
    //             console.log(childItemName);
    //             this.copyRecursiveSync(path.join(src, childItemName),
    //                 path.join(dest, childItemName));
    //         });
    //     } else {
    //         fs.copyFileSync(src, dest);
    //     }
    // };
    
    
    async copyProduct (product) {
        const client = await pool.connect();
        try {
            const SQL = `INSERT INTO data.products(
                       name, price, description, keywords, quantity, photos, publish, user_id
                    )
                    SELECT name, price, description, keywords, quantity, photos, publish, user_id
                    FROM data.products WHERE id=${product.id} AND user_id=${product.user_id} RETURNING id;`;
            const resNew = await client.query(SQL);
            if (product.photos.length > 0) {
                copyRecursiveSync(`./public/uploads/products/${product.id}`, `./public/uploads/products/${resNew.rows[0].id}`);
                const newPhotos = [];
                product.photos.forEach(photo => {
                    newPhotos.push(photo.replace(`products/${product.id}/`, `products/${resNew.rows[0].id}/`));
                });
                const queryUpdate = `
                    UPDATE data.products
                    SET
                        photos = '{${newPhotos}}'
                     WHERE id=${resNew.rows[0].id} ;`;
                await client.query(queryUpdate);
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
