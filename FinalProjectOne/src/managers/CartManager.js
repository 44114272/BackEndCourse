import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data, null, '\t');
                return carts;
            }
            else {
                return [];
            }

        } catch (error) {
            console.log(error)
        }
    }

    createCart = async (product = []) => {
        try {
            const carts = await this.getCarts();
            const newCart = {};
            carts.length === 0 
                ? 
            newCart.id = 1 
                : 
            newCart.id = carts[carts.length -1].id + 1;
            newCart.products = product;
            carts.push(newCart);
            fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

        } catch (error) {
            console.log(error)
        }

    }


    getCartByID = async (id) => {
        try {
            const carts = await this.getCarts();
            const findCart = carts.find(cart => cart.id === id);
            return (!findCart) ? null : findCart;
        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (cart, product) => {
        try {
            const carts = await this.getCarts();
            const cartIndex = !cart  ? -1 
                :
            (carts.findIndex(cart => cart.id === cart.id))
            if (cartIndex === -1) {
                const productToAdd = [{id: product.id, quantity: 1}] ;
                await this.createCart(productToAdd);
                return true;
            }
            const cartToUpdate = carts[cartIndex];
            const productIndex = cartToUpdate.products.findIndex(prod => prod.id === product.id);
            if (productIndex === -1) {
                // Add the new product to the cart
                const productToAdd = { id: product.id, quantity: 1 };
                cartToUpdate.products.push(productToAdd);
            } else {
                // Update the quantity of the existing product in the cart
                const productToUpdate = cartToUpdate.products[productIndex];
                const updatedProduct = { ...productToUpdate, quantity: productToUpdate.quantity + 1 };
                cartToUpdate.products.splice(productIndex, 1, updatedProduct);
            }
            carts.splice(cartIndex, 1, cartToUpdate);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            console.log(`Product added succesfully ${product.title} to the cart.`);
            return true;
        } catch (error) {
            console.log(error);
        }
    }

}