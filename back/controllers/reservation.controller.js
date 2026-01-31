import Reservation from "../models/Reservation.js";
import nodemailer from "nodemailer";

export const createReservation = async (req, res) => {
    try {
        const { name, email, tel, date, guests } = req.body;

        if (!name || !email || !tel || !date || !guests) {
            return res.status(400).json({ message: "Բոլոր դաշտերը պարտադիր են" });
        }

        // 🔹 MongoDB save
        const reservation = await Reservation.create({
            name,
            email,
            tel,
            date,
            guests,
        });

        // 🔹 Mail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // 👤 Client email
        await transporter.sendMail({
            from: `"Ресторан Армения" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Ваше бронирование подтверждено",
            html: `
        <h2>Здравствуйте, ${name}!</h2>
        <p>Ваше бронирование успешно подтверждено ✅</p>
        <p><b>Дата:</b> ${new Date(date).toLocaleString()}</p>
        <p><b>Гостей:</b> ${guests}</p>
        <p>Ждём вас! 🍷</p>
      `,
        });

        // 🧑‍💼 Owner email
        await transporter.sendMail({
            from: `"Reservation Bot" <${process.env.MAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: "📌 Новое бронирование",
            html: `
        <p><b>Имя:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Телефон:</b> ${tel}</p>
        <p><b>Дата:</b> ${new Date(date).toLocaleString()}</p>
        <p><b>Гостей:</b> ${guests}</p>
      `,
        });

        res.status(201).json({ message: "OK", reservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
