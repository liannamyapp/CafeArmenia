import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import menuRoutes from "./routes/menu.routes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reservationRoutes from "./routes/reservation.routes.js";



const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/menu", menuRoutes);
app.use("/images", express.static("public/images"));


app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
