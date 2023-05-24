import { Router } from 'express';
import cartModel from '../dao/models/cart.js';
import productModel from '../dao/models/product.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find();
        const limit = req.query.limit ? parseInt(req.query.limit) : carts.length;
        res.send({ status: 'success', payload: carts.slice(0, limit) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartModel.findById(cartId);
        cart ? res.send(cart) : res.send({ error: 'Cart not found' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartModel.create({});
        res.send({ status: 'success', payload: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const product = await productModel.findById(productId);
        const cart = await cartModel.findById(cartId);
        if (product && cart) {
            cart.products.push({ product: product._id });
            await cart.save();
            res.send({ status: 'success', message: 'Product added to the cart' });
        } else {
            res.send({ status: 'error', message: 'Product or cart not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

// DELETE api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            res.status(404).send({ status: 'error', error: 'Cart not found' });
            return;
        }

        const productIndex = cart.products.findIndex(prod => prod.id === productId);
        if (productIndex === -1) {
            res.status(404).send({ status: 'error', error: 'Product not found in the cart' });
            return;
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        res.send({ status: 'success', message: 'Product removed from the cart' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

// PUT api/carts/:cid
router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = req.body.products;

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            res.status(404).send({ status: 'error', error: 'Cart not found' });
            return;
        }

        cart.products = products;
        await cart.save();

        res.send({ status: 'success', message: 'Cart updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

// PUT api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            res.status(404).send({ status: 'error', error: 'Cart not found' });
            return;
        }

        const product = cart.products.find(prod => prod.id === productId);
        if (!product) {
            res.status(404).send({ status: 'error', error: 'Product not found in the cart' });
            return;
        }

        product.quantity = quantity;
        await cart.save();

        res.send({ status: 'success', message: 'Product quantity updated in the cart' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

// DELETE api/carts/:cid
router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            res.status(404).send({ status: 'error', error: 'Cart not found' });
            return;
        }

        cart.products = [];
        await cart.save();

        res.send({ status: 'success', message: 'All products removed from the cart' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

// GET api/carts/:cid
router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const cart = await cartModel.findById(cartId).populate('products');
        if (!cart) {
            res.status(404).send({ status: 'error', error: 'Cart not found' });
            return;
        }

        res.send({ status: 'success', payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

export default router;