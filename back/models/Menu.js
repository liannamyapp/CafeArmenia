import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        image: { type: String, required: true },
        price: { type: String }
    },
    { _id: false }
);

const MenuCategorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: [MenuItemSchema], default: [] }
    },
    { timestamps: true }
);

export default mongoose.model("Menu", MenuCategorySchema);
