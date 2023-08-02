import {productServices} from '../services/ServicesManager.js';
import CustomError from "../middlewares/errors/CustomError.js";
import EErrors from '../middleware/errors/enum.js'
import { generateProductErrorInfo } from "../middleware/errors/info.js";
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

export const addProduct = async(req, res) => {

        const product = req.body;
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.status ||
            !product.stock ||
            !product.category
        ) {
            throw CustomError.createError({
                name: "TYPE_ERROR",
                cause: generateProductErrorInfo(body),
                message: "Error trying to create the product.",
                code: EErrors.INVALID_TYPE_ERROR
            });
        }
        const result = await productServices.addProduct(product);
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productServices.getAll());
        res.send({ status: 'success', payload: result })
};

export const getProductById = async (req, res) => {
    const prodId = req.params.pid;
    const product = await productServices.getProductById(prodId)
    product ? res.send({ status: 'success', payload: product }) : res.send({ error: 'Product not found' });
};

export const updateProduct = async (req, res) => {
    const product = req.body;
    const productId = req.params.pid;
    const result = await productServices.updateProduct(productId, product)
    result ? res.send({ status: 'success', payload: result }) : res.status(400).send({ status: 'error', error: 'No se puedo actualizar' });
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    const result = await productManager.deleteProduct(productId)
    if (result != null) {
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productManager.getAll());
        res.send({ status: 'Success', message: 'Eliminado corectamente' })
    } else {
        res.status(400).send({ status: 'error', error: 'No se encontró el elemento a eliminar' });
    }
};

export const getMocksProducts = async (request, response) => {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
  
    response.send(products);
  };