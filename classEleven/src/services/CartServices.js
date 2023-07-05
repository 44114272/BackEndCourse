import { CART_DAO } from "../dao/DaoManagers.js";

class CartServices {
  getCart = async (id) => await CART_DAO.getCart()
  createCart = async () => await CART_DAO.addCart();
  getCartById = async (id) => await CART_DAO.getCartById(id);
  addProductInCart = async (cid, pid) => await CART_DAO.addProduct(cid, pid)
}

export default CartServices;