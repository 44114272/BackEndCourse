import express from 'express';
import ProductManager from './ProductManager/ProductManager.js';

const app = express();

const manager = new ProductManager('./products.json');

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
    if(product) {res.send({product})}
    else {res.send('Product not found')};
})


app.listen(8080, () => console.log("Listening on 8080"));











// await manager.addProduct('Test product 1', "This is a test product 1", 100, "Without image", "abc123", 25);
// await manager.addProduct('Test product 2', "This is a test product 2", 200, "Without image", "abc456", 25);
// await manager.addProduct('Test product 3', "This is a test product 3", 300, "Without image", "abc789", 25);
// await manager.addProduct('Test product 4', "This is a test product 4", 400, "Without image", "def123", 25);
// await manager.addProduct('Test product 5', "This is a test product 5", 500, "Without image", "def456", 25);
// await manager.addProduct('Test product 6', "This is a test product 6", 600, "Without image", "def789", 25);
// await manager.addProduct('Test product 7', "This is a test product 7", 700, "Without image", "ghi123", 25);
// await manager.addProduct('Test product 8', "This is a test product 8", 800, "Without image", "ghi456", 25);
// await manager.addProduct('Test product 9', "This is a test product 9", 900, "Without image", "ghi789", 25);
// await manager.addProduct('Test product 10', "This is a test product 10", 1000, "Without image", "jkl123", 25);