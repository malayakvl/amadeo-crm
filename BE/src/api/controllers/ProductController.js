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
        console.log(req.body);

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
                await productModel.create(dataProduct);
            }
            return res.status(200).json({ success: true });
        });
    }

    async getProduct (req, res) {

    }
}

export default new ProductController();
