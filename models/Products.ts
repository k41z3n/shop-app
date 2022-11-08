import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new Schema({
    description: { type: String, require: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: `Size {VALUE} not valid`
        }
    }],
    slug: { type: String, require: true },
    tags: [{ type: String }],
    title: { type: String, require: true },
    type: {
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: `Type {VALUE} not valid`
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: `Gender {VALUE} not valid`
        }
    }
}, {
    timestamps: true
});


productSchema.index({title:'text',tags:'text'})

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema)

export default Product