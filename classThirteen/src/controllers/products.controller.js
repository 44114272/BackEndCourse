import {productServices} from '../services/ServicesManager.js';
// import CustomError from "../middlewares/errors/CustomError.js";
// import EErrors from '../middleware/errors/enum.js'
// import { generateProductErrorInfo } from "../middleware/errors/info.js";
import { generateProduct } from "../utils.js";

export const getProducts = async(req,res) => {
    const { limit, sort, page, query } = request.query;
    let res = await productServices.getProducts(
      parseInt(limit),
      page,
      query,
      sort
    );
    let urlParams = `/api/products?`;
    if (query) urlParams += `query=${query}&`;
    if (limit) urlParams += `limit=${limit}&`;
    if (sort) urlParams += `sort=${sort}&`;
    res.prevLink = res.hasPrevPage ? `${urlParams}page=${res.prevPage}` : null;
    res.nextLink = res.hasNextPage ? `${urlParams}page=${res.nextPage}` : null;
    res?.error
      ? response.send({ status: `error`, products: res })
      : response.send({ status: `success`, products: res });
};

// export const addProduct = async(req, res) => {
//         const product = req.body;
//         if (
//             !product.title ||
//             !product.description ||
//             !product.price ||
//             !product.code ||
//             !product.status ||
//             !product.stock ||
//             !product.category
//         ) {
//             throw CustomError.createError({
//                 name: "TYPE_ERROR",
//                 cause: generateProductErrorInfo(body),
//                 message: "Error trying to create the product.",
//                 code: EErrors.INVALID_TYPE_ERROR
//             });
//         }
//         const result = await productServices.addProduct(product);
//         const io = req.app.get('socketio');
//         io.emit('updateProducts', await productServices.getAll());
//         res.send({ status: 'success', payload: result })
// };

export const addProduct = async (req, res) => {
    const io = request.app.get("socketio");
    const { body } = request;
    let product = { ...body, status: true };
    let result = await productServices.addProduct(product);
    let result2 = await productServices.getProducts();
    res.send(result);
    io.emit("products", result2);
};

export const getProductById = async (req, res) => {
    const {prodId} = req.params;
    const result = await productServices.getProductById(prodId)
    result?.error
    ? res.status(404).send({ status: `error`, ...result })
    : res.send({ status: `success`, product: result });
};

export const updateProduct = async (req, res) => {
    const {productId} = req.params;
    const result = await productServices.updateProduct(productId, req.body)
    result?.error
    ? res.status(400).send({ ...result })
    : res.send({ product: result });
};

export const deleteProduct = async (req, res) => {
    const {productId} = req.params;
    const io = request.app.get("socketio");
    let result = await productServices.deleteProduct(productId);
    let result2 = await productServices.getProducts();
    res.send(result)
    io.emit("products", result2);
};

export const getMocksProducts = async (request, response) => {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    response.send(products);
  };