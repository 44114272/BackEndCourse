import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: String,
        default: "Without image"
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Category 1", "Category 2"]
    }
});

const productModel = mongoose.model(productCollection, productSchema);
  
export default productModel;