import fs from 'fs';

export default class ProductManager{
    constructor(path) {
        this.path = path;
    };

    getProducts= async () => {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    addProduct = async(product) => {
        try {
            const products = await this.getProducts();
            products.length === 0 
                ? 
            product.id = 1 
                : 
            product.id = products[products.length -1].id + 1;
                    
            const checkingCode = products.findIndex(prod => prod.code === code);
            
            checkingCode === -1 
                ? 
            (products.push(product) && console.log(`Product added succesfully. Id: ${product.id}.`))
                : 
            console.log(`Error: The code: ${product.code} already exist. Try with another.`);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error) {
            console.log(error);
        }
    }
    getProductById = async(id) => {
        try {
            const products = await this.getProducts();
            const findProduct = products.find(prod => 
                 prod.id === id
            );
            return (!findProduct) ? 
            `Error: Product not found. The id: ${id} does not exist.` 
            : findProduct;
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async(id, newValue) => {
        try {
            let products = await this.getProducts();
            const productIndex = products.findIndex(prod => prod.id === id);

            if (productIndex !== -1) {
                products[productIndex] = {...products[productIndex], ...newValue}
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(`Product with id: ${id} update`);
            } else {
                console.log(`The product with id: ${id} to update was not found`)
            }
        } catch (error) {
            console.log(error);
        }
     }

     deleteProduct = async (id) => {
        try {
            let products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(`Product with id: ${id} deleted`);
            } else{
                console.log(`Product with id: ${id} to delete not found`);
            }
        } catch (error) {
            console.log(error);
        }
    };
}