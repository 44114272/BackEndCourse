import {cartServices} from '../services/ServicesManager.js'
import {productServices} from '../services/ServicesManager.js'

export const getCart = async (req, res) => {
    try {
        const cart = await cartServices.getAll();
        const limit = req.query.limit ? parseInt(req.query.limit) : cart.length;
        res.send({ status: 'success', payload: cart.slice(0, limit) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
}
export const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartServices.getById(cartId)
    cart ? res.send(cart) : res.send({ error: 'Cart not found' });
}
export const createCart = async (req, res) => {
    try {
        const result = await cartServices.add();
        res.send({ status: 'success', payload: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: error, error });
    }
}
export const addProduct = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const product = await productServices.getById(productId);
    const cart = await cartServices.getById(cartId);
    cartServices.addToCart(cart, product);
    res.send({ status: 'succes', message: 'Product added to the Cart' })
}