import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "superAdmin"], default: "admin" },
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin; // ✅ սա է default export
