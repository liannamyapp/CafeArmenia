import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        tel: { type: String, required: true },
        date: { type: Date, required: true },
        guests: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);
