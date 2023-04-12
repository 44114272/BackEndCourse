import {promises} from 'fs';

export default class ProductManager{
    constructor(path) {
        this.path = path;
    };

    getProducts= async () => {
        try {
            if(promises.existsSync(this.path)){
                const data = await promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async(
        title,
        description,
        price,
        thumnail,
        code,
        stock) => {
        try {
            const product = {
                title,
                description,
                price,
                thumnail,
                code,
                stock,
            };
            const products = await this.getProducts();
            products.length === 0 
                ? 
            product.id = 1 
                : 
            product.id = products[products.length -1].id + 1;

            if (!title || !description ||
            !price || !thumnail ||
            !code || !stock) {
                console.log('Error: Product could not be added. Check that all fields are complete.')
                return;
            }
                    
            const checkingCode = products.findIndex(prod => prod.code === code);
            
            checkingCode === -1 
                ? 
            (products.push(product) && console.log(`Product added succesfully. Id: ${product.id}.`))
                : 
            console.log(`Error: The code: ${product.code} already exist. Try with another.`);

            await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error) {
            console.log(error);
        }
    }
    getProductById = async(id) => {
        const products = await this.getProducts();
        const findProduct = products.find(prod => 
             prod.id === id
        );
        return (!findProduct) ? 
        `Error: Product not found. The id: ${id} does not exist.` 
        : findProduct && console.log(findProduct);
    };

    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts();
            products.forEach((prod , i) =>{
                if(prod.id === id){
                products.splice(i, 1)
                }
            })
            await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            console.log(`Product with id: ${id} was deleted`);

        } catch (error) {
            console.log(error);
        }
    };

    updateProduct = async(id, newValue) => {
        try {
            let products = await this.getProducts();
            const productIndex = products.findIndex(prod => prod.id === id);

            if (productIndex !== -1) {
                products[productIndex] = {...products[productIndex], ...newValue}
                await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(await this.getProducts());
            } else {
                console.log('The product to update was not found')
            }
        } catch (error) {
            console.log(error);
        }
     }
}