import { Router } from 'express';
import productModel from '../dao/models/product.js';

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 5;
    const options = {
      page,
      limit,
    };

    const products = await productModel.paginate({}, options);

    res.render('products', { products });
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {

    const cartId = req.params.cid;
    const products = await productModel.find({ cartId });
    res.render('cart', { products });

  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.render('realTimeProducts', { products });
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

router.get('/addproduct', (req, res) => {
  try {
    res.render('addproduct');
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});
export default router;