class ProductManager {
    constructor() {
        this.products = [];
    };
    getProducts = () => {
        return this.products;
    };
    addProduct = (
        title, description, price, thumnail,
        code, stock
    ) => {
        const product = {
            title,
            description,
            price,
            thumnail,
            code,
            stock,
        };
        this.products.length === 0 
            ? 
        product.id = 1 
            : 
        product.id = this.products[this.products.length -1].id + 1;

        if (!title ||
            !description ||
            !price ||
            !thumnail ||
            !code ||
            !stock) {
                console.log('Error: Product could not be added. Check that all fields are complete.')
                return;
            }
        const checkingCode = this.products.findIndex(prod => prod.code === code);
        
        checkingCode === -1 
            ? 
        (this.products.push(product) && console.log(`Product added succesfully. Id: ${product.id}.`))
            : 
        console.log(`Error: The code: ${product.code} already exist. Try with another.`);
    }
    getProductById = (id) => {
        const findProductId = this.products.find(prod => 
             prod.id === id
        );
        return (!findProductId) ? `Error: Product not found. The id: ${id} does not exist.` : findProductId;
    };
};

const products = new ProductManager();

console.log('Initial Products');
console.log(products.getProducts());

console.log('Adding the first product');
products.addProduct('Iphone 14', 'The last phone from Apple', 1300, 'without image', 'ai14', 5);
console.log(products.getProducts());

console.log('Adding the second product');
products.addProduct('Samsung S23', 'The last phone from Samsung', 1100, 'without image', 'ss23', 4);
console.log(products.getProducts());

console.log('Product without some fields');
products.addProduct('Iphone 14 Pro Max', 1500, 'without image', 2);
console.log(products.getProducts());

console.log('Adding a product with code that is already in use');
products.addProduct('Samsung S23 Plus', 'The last phone from samsung', 1300, 'without image', 'ss23', 2);
console.log(products.getProducts());

console.log('Showing product with id number 2');
console.log(products.getProductById(2));

console.log('Showing product with id: 7 that does not exist');
console.log(products.getProductById(7));