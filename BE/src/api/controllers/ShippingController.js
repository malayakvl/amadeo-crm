import multer from 'multer';
import shippingModel from '../models/Shipping.js'

export default new class ShippingController {
    create(req, res) {
        if (!req.user) {
            return res.status(402).json('Something wend wrong');

        }
        
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/shipping/');
            },
            filename: function (req, file, cb) {
                const unique = (Date.now() + '-' + Math.floor(Math.random() * 100))
                const extension = file.originalname.split('.').pop()

                cb(null, `${unique}.${extension}`);
            }
        });

        const upload = multer({ storage }).single('logo');

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);

            }

            const shipping = await shippingModel.findByName(req.body.name)

            if (shipping) {
                return res.status(403).json({})

            }
            
            shippingModel.create(req.body.name, `/uploads/shipping/${req.file.filename}`);
            
            return res.status(200).json({});
        });

    }

    async fetchAll(req, res) {
        const shippings = await shippingModel.getAll()
        
        return res.status(200).json({shippings})

    }
}
