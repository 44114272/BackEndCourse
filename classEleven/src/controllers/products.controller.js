import {productServices} from '../services/ServicesManager.js';

export const getProducts = async(req,res) => {
    try {
        const products = await productServices.getAll();

        const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
        res.send({ status: 'success', payload: products.slice(0, limit) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
};

export const addProduct = async(req, res) => {
    try {
        const product = req.body;
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.category
        ) {
            return res.status(400).send({ status: 'error', error: 'Incomplete or incorrect values' })
        }
        const result = await productServices.addProduct(product);
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productServices.getAll());
        res.send({ status: 'success', payload: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
};

export const getProductById = async (req, res) => {
    const prodId = req.params.pid;
    const product = await productServices.getProductById(prodId)
    product ? res.send({ status: 'success', payload: product }) : res.send({ error: 'Product not found' });
};

export const updateProduct = async (req, res) => {
    const product = req.body;
    const productId = req.params.pid;
    const result = await productServices.updateProduct(productId, product)
    result ? res.send({ status: 'success', payload: result }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    const result = await productManager.deleteProduct(productId)
    if (result != null) {
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productManager.getAll());
        res.send({ status: 'Success', message: 'Eliminado corectamente' })
    } else {
        res.status(400).send({ status: 'error', error: 'No se encontró el elemento a eliminar' });
    }
};