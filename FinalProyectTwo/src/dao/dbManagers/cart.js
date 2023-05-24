import cartModel  from '../models/cart.js'

export default class Cart {
    constructor() {
        console.log('Working carts with DB')
    }

    getAll = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    getById = async (id) => {
        const cart = await cartModel.findById(id).lean();
        return cart;
    }

    add = async (products = []) => {
        const result = await cartModel.create({ products: products });
        return result;
    }

    addToCart = async (cart, product) => {
        const cartCreated = await this.getById(cart._id);

        if (!cartCreated) {
            const newCart = await this.add([{ id: product._id, quantity: 1 }]);
            console.log(`A new cart was created with id: ${newCart._id}.`);
        } else {
            console.log('cart already exists')
            const productIndex = cartCreated.products.findIndex(
                (prod) => prod._id === product._id
            );
            console.log(productIndex);

            if (productIndex === -1) {
                cartCreated.products.push({ id: product._id, quantity: 1 });
            } else {
                cartCreated.products[productIndex].quantity += 1;
            }

            console.log(cartCreated)
            const updatedCart = await cartModel.findByIdAndUpdate(
                cartCreated._id,
                cartCreated,
                { new: true }
            );

            console.log(
                `Product: ${product.title} added successfully. Id: ${updatedCart._id}.`
            );
        }
    }
}