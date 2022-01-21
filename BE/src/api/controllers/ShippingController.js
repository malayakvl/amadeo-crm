import multer from 'multer';
import fs from 'fs';
import shippingModel from '../models/Shipping.js'

export default new class ShippingController {
    create(req, res) {
        if (!req.user) {
            return res.status(402).json('Something wend wrong');

        }

        const dirUpload = `${process.env.DOWNLOAD_FOLDER}/shipping/`;

        if (!fs.existsSync(dirUpload)) {
            fs.mkdirSync(dirUpload);

        }

        const filename = Date.now() + '-' + Math.floor(Math.random() * 100);
        const path = 'public/uploads/shipping/'

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path);
            },
            filename: function (req, file, cb) {
                cb(null, filename);
            }
        });

        const upload = multer({ storage: storage }).single('logo');

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);

            }

            const shipping = await shippingModel.findByName(req.body.name)

            if (shipping) {
                return res.status(403).json({})

            }
            
            shippingModel.create(req.body.name, `${path}${filename}`);
            
            return res.status(200).json({});
        });

    }
}