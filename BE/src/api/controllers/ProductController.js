import productModel from '../models/Product.js';
import multer from 'multer';
import fs from 'fs';

class ProductController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchAdditional (req, res) {
        const additional = await productModel.getAdditional();
        if (!additional) {
            return res.status(402).json('Something wend wrong');
        }
        // const addresses = await userModel.findUserAddresses(user.id);
        return res.status(200).json({ colors: additional.colors, sizes: additional.sizes });
    }

    async addProduct (req, res) {
        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }
        const dirUpload = `${process.env.DOWNLOAD_FOLDER}/products/${req.user.id}`;
        if (!fs.existsSync(dirUpload)) {
            fs.mkdirSync(dirUpload);
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `public/uploads/products/${req.user.id}`);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
        const upload = multer({ storage: storage }).any('photos');

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }
            const dataProduct = req.body;
            const photos = [];
            if (req.files.length > 0) {
                req.files.forEach(file => {
                    photos.push(`uploads/products/${req.user.id}/${file.filename}`);
                });
            }
            dataProduct.photos = photos;

            if (!dataProduct.id) {
                await productModel.create(dataProduct, req.user.id);
            } else {
                await productModel.update(dataProduct, req.user.id);
            }
            return res.status(200).json({ success: true });
        });
    }

    async fetchData (req, res) {
        const { limit, offset } = req.query;

        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }

        const data = await productModel.getAll(1, limit, req.user.id, false, offset);
        if (!data.error) {
            return res.status(200).json({ items: data.products, count: data.size });
        } else {
            return res.status(402).json({ error: 'Something wend wrong' });
        }
    }

    async fetchProduct (req, res) {
        if (!req.user) {
            return res.status(402).json('Something wend wrong');
        }
        const data = await productModel.fetchProduct(req.params.id, req.user.id);
        if (!data.error) {
            return res.status(200).json({ product: data });
        } else {
            return res.status(402).json({ error: 'Something wend wrong' });
        }
    }

    async deleteRow (req, res) {
        return res.status(200).json({ success: true });
    }
}

export default new ProductController();
