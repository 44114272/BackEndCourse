export const generateProductErrorInfo = product => {
    const { title, description, code, price, stock, category } = product;
    
    return `One or more propertiers were incomplete or not valid.
    List of required properties:
    *Title: needs to be string, recived: ${title}
    *Description: needs to be string, recived: ${description}
    *Category: needs to be string, recived: ${category}
    *Stock: needs to be number, recived: ${stock}
    *Price: needs to be string, recived: ${price}
    *Code: needs to be string, recived: ${code}
    `
} 