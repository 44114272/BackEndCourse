import { CART_DAO } from "../dao/index.js";

class CartServices {
  getCart = async () => await CART_DAO.getAll()
  getCartById = async (id) => await CART_DAO.getById(id);
  createCart = async () => await CART_DAO.add();
  addProduct = async (cid, pid) => await CART_DAO.addToCart(cid, pid)
}

export default CartServices;