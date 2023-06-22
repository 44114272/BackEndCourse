import { Router } from 'express';
import Cart from '../dao/dbManagers/cart.js';
import Product from '../dao/dbManagers/product.js';

const router = Router();
const cartManager = new Cart();
const productManager = new Product();

router.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getAll();
        const limit = req.query.limit ? parseInt(req.query.limit) : cart.length;
        res.send({ status: 'success', payload: cart.slice(0, limit) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartManager.getById(cartId)
    cart ? res.send(cart) : res.send({ error: 'Cart not found' });
});

router.post('/', async (req, res) => {
    try {
        const result = await cartManager.add();
        res.send({ status: 'success', payload: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const product = await productManager.getById(productId);
    const cart = await cartManager.getById(cartId);
    cartManager.addToCart(cart, product);
    res.send({ status: 'succes', message: 'Product added to the Cart' })
});

export default router;