import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';

const router = Router();

const cartManager = new CartManager('./src/files/carts.json')
const productManager = new ProductManager('./src/files/products.json')

//Get all Carts
router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    const limit = req.query.limit ? parseInt(req.query.limit) : carts.length;
    res.send(carts.slice(0, limit));
})

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartByID(cartId)
    cart ? res.send(cart) : res.send({ error: 'Cart not found' });

})

router.post('/', async (req, res) => {
    await cartManager.createCart();
    res.send({ status: 'success', message: 'Create cart succesfully' })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const product = await productManager.getProductByID(productId);
    const cart = await cartManager.getCartByID(cartId);
    console.log(cart)
    cartManager.addProductToCart(cart, product);
    res.send({ status: 'success', message: 'Product addded succesfully' })

})

export default router