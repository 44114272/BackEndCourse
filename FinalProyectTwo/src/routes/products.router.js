import { Router } from 'express';
import productModel from '../dao/models/product.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit = 5, page = 1, sort, query } = req.query;
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true,
        };

        const filter = {};

        if (query) {
        filter.$or = [
            { category: { $regex: query, $options: 'i' } },
            { availability: { $regex: query, $options: 'i' } },
        ];
        }

        if (sort) {
        options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } =
        await productModel.paginate(filter, options);

        const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
        const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;

        res.send({
            status: 'success',
            payload: docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.category
        ) {
            return res.status(400).send({ status: 'error', error: 'Incomplete or incorrect values' });
        }
        const newProduct = await productModel.create(product);
        const io = req.app.get('socketio');
        io.emit('updateProducts', await productModel.find());
        res.send({ status: 'success', payload: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await productModel.findById(productId);
        product ? res.send({ status: 'success', payload: product }) : res.send({ error: 'Product not found' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

// update
router.put('/:pid', async (req, res) => {
    const product = req.body;
    const productId = req.params.pid;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, product, { new: true });
        updatedProduct ? res.send({ status: 'success', payload: updatedProduct }) : res.status(400).send({ status: 'error', error: 'Failed to update' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const deletedProduct = await productModel.findByIdAndRemove(productId);
        if (deletedProduct) {
            const io = req.app.get('socketio');
            io.emit('updateProducts', await productModel.find());
            res.send({ status: 'success', message: 'Deleted successfully' });
        } else {
            res.status(400).send({ status: 'error', error: 'Element to delete not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

export default router;