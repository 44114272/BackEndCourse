import {cartServices, productServices} from '../services/ServicesManager.js';

export const getCart = async (req, res) => {
    const { cartId } = req?.user?.cart || req?.params;
    let result = await cartServices.getCart(cartId);
    if (result?.error) {
        res.status(404).send({ result });
        } else {
        res.send({ status: `success`, payload: result });
    }
};

export const createCart = async (req, res) => {
    const result = await cartServices.add();
    if (result?.error) {
        req.logger.error(`ERROR => ${new Date()} - ${ result.error }`);
        res.status(404).send({ status: result.error });
    } else {
        res.send({
            status: `The cart was created succesfully.`,
            payload: result,
        });
    }
}

export const deleteCart = async (req, res) => {
    const { cartId } = req.params;
    let result = await cartServices.deleteCart(cartId);
    if (result?.error) {
      res.status(400).send({ ...result })
    } else {
      res.send({ ...result });
    }
};

export const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartServices.getById(cartId)
    cart ? res.send(cart) : res.send({ error: 'Cart not found' });
};

export const addProduct = async (req, res) => {
    const {cartId} = req.params;
    const {products} = req.body;
    const product = await productServices.getById(products);
    const cart = await cartServices.getById(cartId);
    cartServices.addToCart(cart, product);
    res.send({ status: 'succes', message: 'Product added to the Cart' })
};