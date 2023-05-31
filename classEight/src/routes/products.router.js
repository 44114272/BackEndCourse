import { Router } from "express";
import productModel from "../models/products.model.js";

const router = Router();

router.get('/products', async (req, res) => {
    try {
        await productModel.find();
        res.redirect('/views/products');
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
  });

export default router;