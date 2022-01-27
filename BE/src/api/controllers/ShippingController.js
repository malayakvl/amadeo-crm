import multer from 'multer';
import fs from 'fs';
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

    async update(req, res) {
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
            const id = req.params.id
            const name = req.body.name

            let shipping = await shippingModel.findByName(name)

            if (!shipping || (shipping && shipping.id == id)) {
                if (shipping) {
                    shippingModel.update(id, name, req.file ? `/uploads/shipping/${req.file.filename}` : shipping.image)
                    return res.status(200).json({});

                }

                shipping = await shippingModel.findById(id)
                shippingModel.update(id, name, shipping.image)
                return res.status(200).json({});

            }

            return res.status(403).json({});

        });

    }

    delete(req, res) {
        shippingModel.delete(req.params.id).then(() => {
            res.status(200).json({})
        })

    }

    saveCountries(req, res) {
        shippingModel.saveCountries(req.user.id, req.params.id, req.body)
        return res.status(200).json({})
    }

    async fetchAll(req, res) {
        const shippings = await shippingModel.getAll()

        const promises = shippings.map(async shipping => {
            shipping.countries = await shippingModel.findCountriesById(shipping.id)

        })

        await Promise.all(promises)

        return res.status(200).json({ shippings })

    }

    async fetch(req, res) {
        const shipping = await shippingModel.findById(req.params.id)
        const countries = await shippingModel.findCountriesById(req.params.id)

        return res.status(200).json({ ...shipping, countries })

    }

    changeStatuses(req, res) {
        shippingModel.changeStatuses(req.body.status)
        res.status(200).json({})

    }

    changeStatus(req, res) {
        shippingModel.changeStatus(req.body.status, req.params.id)
        res.status(200).json({})

    }
}