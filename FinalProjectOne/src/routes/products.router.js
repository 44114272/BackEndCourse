import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();

const productManager = new ProductManager('./src/files/products.json')

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.send(products.slice(0, limit));
})

// search by id
router.get('/product/:id', async (req,res) => {
    const productId = parseInt(req.params.id);
    const product = await productManager.getProductById(productId);
    product ? res.send(product) 
        : 
    res.send({error: `Product with id: ${productId} not found`});
})

// add product
router.post('/', async (req, res) => {
    const product = req.body;
    if(!product.status) {
        product.status = true;
    }

    if (!product.title || !product.description 
        || !product.price || !product.code 
        || !product.category || !product.stock) {
            return res.status(400).send({error: 'Product could not be added. Check that all fields are complete.'});
        }
    const result = await productManager.addProduct(product);
    res.send({ status: 'success', result })
})

// update product
router.put('/product/:id', async (req, res) => {
    const product = req.body;
    const productId = Number(req.params.id);
    await productManager.updateProduct(productId, product);

    if (product.code)
        return res.status(400).send({error: 'Product not added. The value code can not be added again'});
    else if(product.id)
        return res.status(400).send({error: 'Product not added. Id can not be added'});

    res.send({ status: 'Success', message: 'Product updated' })
})

router.delete('/product/:id', async (req, res) => {
    const productId = Number(req.params.id);
    await productManager.deleteProduct(productId)
    res.send({ status: 'Success', message: 'Product deleted' })
})

export default router;