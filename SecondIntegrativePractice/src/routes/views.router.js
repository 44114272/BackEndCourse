import {Router} from 'express';
import Product from '../dao/dbManagers/product.js';

const router = Router();
const productManager = new Product();

router.get('/home', async (req, res) => {
    try {
        const prods = await productManager.getAll();
        res.render('home', { prods });
    } catch (error) {
        console.log(error);
    }
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
     res.render('login');
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const prods = await productManager.getAll();
        res.render('realTimeProducts', { prods });
    } catch (error) {
        console.log(error);
    }
})

router.get('/addproduct', (req, res) => {
    try {
        res.render('addproduct');
    } catch (error) {
        console.log(error)
    }
})

router.get('/chat', (req,res) =>{
    try {
        res.render('chat')
    } catch (error) {
        console.log(error)
    }
})

export default router;