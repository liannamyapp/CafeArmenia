import express from "express";
import {
    getMenu,
    createCategory,
    addItem,
    updateItem,
    deleteItem,
    deleteCategory
} from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/", getMenu);
router.post("/", createCategory);
router.post("/:id/item", addItem);
router.put("/:categoryId/item/:itemIndex", updateItem);
router.delete("/:categoryId/item/:itemIndex", deleteItem);
router.delete("/:id", deleteCategory);

export default router;
