import {Router} from 'express';

const router = Router();

router.get('/home', home);
router.get('/register', register);
router.get('/login', login);
router.get('/realtimeproducts', realTimeProducts);
router.get('/addproduct', addProduct);
router.get('/chat', chat);

export default router;