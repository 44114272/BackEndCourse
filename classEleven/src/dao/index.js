import Cart from './dbManagers/cart.js';
import Product from './dbManagers/product.js';

const cartManager = new Cart();
const productManager = new Product();

export const PRODUCT_DAO = productManager;
export const CART_DAO = cartManager;