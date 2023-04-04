import ProductManager from "./productManager/productManager.js";

const manager = new ProductManager('./files/products.json');

const send = async () => {
    await manager.getProducts();

    const updateProduct = {
        title: "Title updated",
        description: "This is a test product updated"
    }

    // test product already added
    await manager.addProduct('Test product', "This is a test product", 200, "Without image", "abc123", 25);
    
    // second product to add
    // await manager.addProduct('Test product 2', "This is a test product 2", 400, "Without image", "def456", 5);
    
    // filter by id
    // await manager.getProductById(1);

    // update product with id: 1
    // await manager.updateProduct(1, updateProduct);

    // delete product with id: 1
    // await manager.deleteProduct(1);
}

send();