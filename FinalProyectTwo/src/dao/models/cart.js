import mongoose from "mongoose";
const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;