import { Router } from 'express';
// import Cart from '../dao/dbManagers/cart.js';
// import Product from '../dao/dbManagers/product.js';
import {getCart, getCartById, 
    createCart, addProduct } from '../controllers/carts.controller.js'

const router = Router();

router.get('/', getCart)
router.get('/:cid', getCartById)
router.post('/', createCart)
router.post('/:cid/product/:pid', addProduct)

export default router;