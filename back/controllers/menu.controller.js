import Menu from "../models/Menu.js";

// GET all categories
export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find().sort({ createdAt: 1 });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE category
export const createCategory = async (req, res) => {
    try {
        const category = new Menu(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ADD item to category
export const addItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);

        menu.content.push(req.body);
        await menu.save();

        res.json(menu);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE item
export const updateItem = async (req, res) => {
    try {
        const { categoryId, itemIndex } = req.params;
        const menu = await Menu.findById(categoryId);

        menu.content[itemIndex] = {
            ...menu.content[itemIndex],
            ...req.body,
        };

        await menu.save();
        res.json(menu);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE item
export const deleteItem = async (req, res) => {
    try {
        const { categoryId, itemIndex } = req.params;
        const menu = await Menu.findById(categoryId);

        menu.content.splice(itemIndex, 1);
        await menu.save();

        res.json(menu);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE category
export const deleteCategory = async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
