// import chatbotModel from '../models/Chatbot.js';

class ChatbotController {
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async fetchItems (req, res) {
        // const { limit, offset, queryFilter } = req.query;

        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        
        const items = [
            {
                id: 3,
                name: 'ID: 3 First added item',
                trigger: 'Buyer successfully added wanted item to his cart *for the first time/ first item of the live',
                description_fr: 'Bravo! (nom de l’article ici) a été réservé(e) et ajouté(e) à votre panier!\n' +
                    'ATTENTION : La réservation de votre produit est valable uniquement durant (minuterie panier ici).\n' +
                    'Vérifiez le minuteur de votre panier car une fois le temps écoulé, vos produits seront automatiquement remis à la vente.\n' +
                    'EN PLUS! Si vous commandez plusieurs (temps de fenêtre de livraison gratuite ici), on vous facture les frais de port qu’une seule fois! Et à partir de (montant en Euro éligible pour la livraison gratuite ici), ils sont offerts!',
                description_en: 'Well done! (Item name here) has been reserved for you and added to your basket!\n' +
                    'ATTENTION: The reservation of your product is only valid for (cart timer here).\n' +
                    'Check the timer of your basket because once the time has elapsed, your products will automatically be put back for sale.\n' +
                    'IN ADDITION! If you order multiple times in the (free shipping window time here), you will be billed for shipping costs only once! And from (amount in Euro qualifying for free shipping here), they are free!',
                active: true,
                created_at: null,
                updated_at: null
            },
            {
                id: 4,
                name: 'ID: 4 First added item',
                trigger: 'Buyer successfully added wanted item to his cart *for the first time/ first item of the live',
                description_fr: 'Bravo! (nom de l’article ici) a été réservé(e) et ajouté(e) à votre panier!\n' +
                    'ATTENTION : La réservation de votre produit est valable uniquement durant (minuterie panier ici).\n' +
                    'Vérifiez le minuteur de votre panier car une fois le temps écoulé, vos produits seront automatiquement remis à la vente.\n' +
                    'EN PLUS! Si vous commandez plusieurs (temps de fenêtre de livraison gratuite ici), on vous facture les frais de port qu’une seule fois! Et à partir de (montant en Euro éligible pour la livraison gratuite ici), ils sont offerts!',
                description_en: 'Well done! (Item name here) has been reserved for you and added to your basket!\n' +
                    'ATTENTION: The reservation of your product is only valid for (cart timer here).\n' +
                    'Check the timer of your basket because once the time has elapsed, your products will automatically be put back for sale.\n' +
                    'IN ADDITION! If you order multiple times in the (free shipping window time here), you will be billed for shipping costs only once! And from (amount in Euro qualifying for free shipping here), they are free!',
                active: true,
                created_at: null,
                updated_at: null
            }
        ]
    
        return res.status(200).json({ items: items, count: 2 });

        // const data = await productModel.getAll(1, limit, req.user.id, false, offset, queryFilter);
        // if (!data.error) {
        //     return res.status(200).json({ items: data.products, count: data.size });
        // } else {
        //     return res.status(401).json({ error: 'Something wend wrong' });
        // }
    }
    
    async fetchItemsSystem (req, res) {
        // const { limit, offset, queryFilter } = req.query;
        
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        
        const items = [
            {
                id: 1,
                name: 'First added item',
                trigger: 'Buyer successfully added wanted item to his cart *for the first time/ first item of the live',
                description_fr: 'Bravo! (nom de l’article ici) a été réservé(e) et ajouté(e) à votre panier!\n' +
                    'ATTENTION : La réservation de votre produit est valable uniquement durant (minuterie panier ici).\n' +
                    'Vérifiez le minuteur de votre panier car une fois le temps écoulé, vos produits seront automatiquement remis à la vente.\n' +
                    'EN PLUS! Si vous commandez plusieurs (temps de fenêtre de livraison gratuite ici), on vous facture les frais de port qu’une seule fois! Et à partir de (montant en Euro éligible pour la livraison gratuite ici), ils sont offerts!',
                description_en: 'Well done! (Item name here) has been reserved for you and added to your basket!\n' +
                    'ATTENTION: The reservation of your product is only valid for (cart timer here).\n' +
                    'Check the timer of your basket because once the time has elapsed, your products will automatically be put back for sale.\n' +
                    'IN ADDITION! If you order multiple times in the (free shipping window time here), you will be billed for shipping costs only once! And from (amount in Euro qualifying for free shipping here), they are free!',
                active: true,
                created_at: null,
                updated_at: null
            },
            {
                id: 2,
                name: 'First added item',
                trigger: 'Buyer successfully added wanted item to his cart *for the first time/ first item of the live',
                description_fr: 'Bravo! (nom de l’article ici) a été réservé(e) et ajouté(e) à votre panier!\n' +
                    'ATTENTION : La réservation de votre produit est valable uniquement durant (minuterie panier ici).\n' +
                    'Vérifiez le minuteur de votre panier car une fois le temps écoulé, vos produits seront automatiquement remis à la vente.\n' +
                    'EN PLUS! Si vous commandez plusieurs (temps de fenêtre de livraison gratuite ici), on vous facture les frais de port qu’une seule fois! Et à partir de (montant en Euro éligible pour la livraison gratuite ici), ils sont offerts!',
                description_en: 'Well done! (Item name here) has been reserved for you and added to your basket!\n' +
                    'ATTENTION: The reservation of your product is only valid for (cart timer here).\n' +
                    'Check the timer of your basket because once the time has elapsed, your products will automatically be put back for sale.\n' +
                    'IN ADDITION! If you order multiple times in the (free shipping window time here), you will be billed for shipping costs only once! And from (amount in Euro qualifying for free shipping here), they are free!',
                active: true,
                created_at: null,
                updated_at: null
            }
        ]
        
        return res.status(200).json({ items: items, count: 2 });
        
        // const data = await productModel.getAll(1, limit, req.user.id, false, offset, queryFilter);
        // if (!data.error) {
        //     return res.status(200).json({ items: data.products, count: data.size });
        // } else {
        //     return res.status(401).json({ error: 'Something wend wrong' });
        // }
    }

    async fetchItem (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const data = await productModel.fetchProduct(req.params.id, req.user.id);
        if (!data.error) {
            return res.status(200).json({ product: data });
        } else {
            return res.status(401).json({ error: 'Access deny' });
        }
    }

    async deleteRow (req, res) {
        const ids = [];
        ids.push(req.params.id);
    
        await productModel.bulkDelete(ids, req.user.id);
        
        return res.status(200).json({ success: true });
    }
    
    async storeItem(req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
    }
    
    async copyRow (req, res) {
        const ids = [];
        ids.push(req.params.id);
        const data = await productModel.copyProduct(ids, req.user.id);
        
        return res.status(200).json({ success: true, productIds: data.productId });
    }

    async bulkDelete (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const ids = [];
        JSON.parse(req.body.data).filter(id => id.checked).forEach(data => ids.push(data.id));
        console.log(ids);
        await productModel.bulkDelete(ids, req.user.id);
        
        return res.status(200).json({ success: true });
    }
    
    async bulkCopy (req, res) {
        if (!req.user) {
            return res.status(401).json('Access deny');
        }
        const ids = [];
        JSON.parse(req.body.data).filter(id => id.checked).forEach(data => ids.push(data.id));
        const data = await productModel.copyProducts(ids, req.user.id);
        
        return res.status(200).json({ success: true, productIds: data.productId });
    }
}

export default new ChatbotController();
