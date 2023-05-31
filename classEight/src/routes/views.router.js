import { Router } from "express";
import productModel from "../models/products.model.js";

const router = Router();

// public access and private
const publicAccess =  (req, res, next) => {
    if(req.session.user) return res.redirect('/products');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

router.get('/products', privateAccess, async (req, res) => {
    try {
      const products = await productModel.find();
      res.render('products', {
        user: req.session.user,
        productos: products
      });
    } catch (error) {
      console.log(error);
      res.status(500).render('error');
    }
  });

export default router;