import express from 'express';
import ProductManager from './ProductManager/ProductManager.js';

const app = express();

const manager = new ProductManager('./src/products.json');

app.use(express.urlencoded({extended: true}));

app.get('/products', async(req,res) => {
    const {limit} = req.query;
    const products = await manager.getProducts();
    const productsLimit = products.splice(0, limit);
    !limit ? res.send({products}) : res.send({productsLimit});
})

app.get('/products/:id', async(req, res) => {
    const productId = Number(req.params.id);
    const product = await manager.getProductById(productId);
    if(product) {res.send(product)}
    else {res.send('Product not found')};
})

app.listen(8080, () => console.log("Listening on 8080"));