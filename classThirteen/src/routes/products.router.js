import { Router } from 'express';
import {getProducts, addProduct, 
       getProductById, updateProduct, 
       deleteProduct, getMocksProducts} 
from '../controllers/products.controller.js';
// import errorHandler from '../middleware/errors/index.js';
// import toAsyncExpressDecorator from "async-express-decorator";

const router = toAsyncExpressDecorator(Router());

router.get("/mocking-products", getMocksProducts);
router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:pid', getProductById);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
// router.use(errorHandler);

export default router;