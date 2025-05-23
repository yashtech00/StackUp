import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: [String], // Changed to array of strings
        required: true
    },
    discount_price: {
        type: String,
        required: true
    },
    original_price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CourseModel = mongoose.model("course", CourseSchema);

export default CourseModel;
