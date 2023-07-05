import {productServices} from '../services/ProductsManager.js';

export const home = async (req, res) => {
    try {
        const prods = await productServices.getAll();
        res.render('home', { prods });
    } catch (error) {
        console.log(error);
    }
};

export const register = (req, res) => {
    res.render('register');
};

export const login = (req, res) => {
     res.render('login');
};

export const realtimeproducts = async (req, res) => {
    try {
        const prods = await productServices.getAll();
        res.render('realTimeProducts', { prods });
    } catch (error) {
        console.log(error);
    }
};

export const addproduct = (req, res) => {
    try {
        res.render('addproduct');
    } catch (error) {
        console.log(error)
    }
};

export const chat = (req,res) =>{
    try {
        res.render('chat')
    } catch (error) {
        console.log(error)
    }
};