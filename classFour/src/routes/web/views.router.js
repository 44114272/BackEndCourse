import {Router} from 'express'
import ProductManager from '../../manager/ProductManager.js';

const router = Router()
const manager = new ProductManager();

router.get('/', async (req, res) => { 
    res.render('realTimeProducts', { products: manager.listAll() });
});

export default router;