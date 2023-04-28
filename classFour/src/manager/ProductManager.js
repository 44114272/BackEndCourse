export default class ProductManager {

    constructor() {
        this.elements = []
    }

    listById = (id) => {
        const element = this.elements.find(element => element.id === id);
        return element || {error: `Element with id: ${id} not found`};
    }

    listAll = () => {
        return [...this.elements];
    }

    save = (element) => {
        let newId;
        this.elements.length === 0 
            ? 
        newId = 1 
            : 
        newId = this.elements[this.elements.length - 1].id + 1;

        const newElement = {...element, id: newId};
        this.elements.push(newElement);
        return newElement;
    }

    update = (element) => {
        const newElement = { ...element, id: Number(element.id)};
        const index = this.elements.findIndex(prod => prod.id === element.id)
        return (!index) ? 
            `Error: Product not found. The id: ${id} does not exist.` 
            : this.elements[index] = newElement && newElement;

    }

    deleteById = (id) => {
        const index = this.elements.findIndex(element => element.id === id);
        return (!index) ? 
            `Error: Product not found. The id: ${id} does not exist.` 
            : this.elements.splice(index, 1); 
    }

    deleteAll = () => {
        this.elements = [];
    }
}