import Cart from '../dao/dbManagers/cart.js';
import Product from '../dao/dbManagers/product.js';

const cartManager = new Cart();
const productManager = new Product();

export const PRODUCT_DAO = productManager;
export const CART_DAO = cartManager;