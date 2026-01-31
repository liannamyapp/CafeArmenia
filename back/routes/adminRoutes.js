import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 REGISTER (մեկ անգամ) */
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const exists = await Admin.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            email,
            password: hashedPassword,
        });

        res.json({ message: "Admin created" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

/* 🔐 LOGIN */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/change-password", auth, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const admin = await Admin.findById(req.admin.id);

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong old password" });
        }

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
        await admin.save();

        res.json({ message: "Password updated" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/all", auth, async (req, res) => {
    if (req.admin.role !== "superAdmin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const admins = await Admin.find().select("-password");
    res.json(admins);
});

router.delete("/:id", auth, async (req, res) => {
    if (req.admin.role !== "superAdmin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });
});
export default router;
