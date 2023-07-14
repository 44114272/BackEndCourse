import { PRODUCT_DAO } from "../dao/index.js";

class ProductServices {
    getProducts = async (limit, sort, page, query) =>
        await PRODUCT_DAO.getAll(parseInt(limit), page, query, sort);
    addProduct = async (product) => await PRODUCT_DAO.addProduct(product);
    getProductById = async (id) => await PRODUCT_DAO.getProductById(id);
    updateProduct = async (id, product) => await PRODUCT_DAO.updateProduct(pid, request.body);
    deleteProduct = async (id) => await PRODUCT_DAO.deleteProduct(pid);
}
  
export default ProductServices