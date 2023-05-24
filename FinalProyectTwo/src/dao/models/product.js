import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema);

productModel.getAll = async () => {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  };
  
export default productModel;