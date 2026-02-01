import React, { useState } from "react";
const API_URL = "https://cafearmenia.onrender.com/api/menu";
export default function Reservations() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tel: "",
        date: "",
        guests: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Имя обязательно";
        if (!formData.tel.trim()) newErrors.tel = "Телефон обязателен";

        if (!formData.email.trim()) {
            newErrors.email = "Email обязателен";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Некорректный email";
        }

        if (!formData.date) newErrors.date = "Выберите дату и время";
        if (!formData.guests || formData.guests < 1)
            newErrors.guests = "Минимум 1 гость";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setServerError("");

        if (!validate()) return;

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/api/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Ошибка отправки");
            }

            setSuccess("✅ Бронирование успешно отправлено! Проверьте email 📩");

            setFormData({
                name: "",
                email: "",
                tel: "",
                date: "",
                guests: "",
            });
        } catch (err) {
            setServerError("❌ Ошибка сервера. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="reservations" id="booking">
            <div className="reservations__container">
                <div className="reservations__header">
                    <div className="reservations__line"></div>
                    <h2 className="reservations__title">Бронирование</h2>
                    <div className="reservations__line"></div>
                </div>

                <p className="reservations__sub-info">
                    Зарезервируйте место прямо сейчас и наслаждайтесь незабываемым вечером.
                </p>

                <form className="reservations__form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Имя *"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? "input-error" : ""}
                        />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            name="tel"
                            placeholder="Телефон *"
                            value={formData.tel}
                            onChange={handleChange}
                            className={errors.tel ? "input-error" : ""}
                        />
                        {errors.tel && <span className="error-msg">{errors.tel}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && (
                            <span className="error-msg">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={errors.date ? "input-error" : ""}
                        />
                        {errors.date && <span className="error-msg">{errors.date}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="guests"
                            placeholder="Количество гостей *"
                            min="1"
                            value={formData.guests}
                            onChange={handleChange}
                            className={errors.guests ? "input-error" : ""}
                        />
                        {errors.guests && (
                            <span className="error-msg">{errors.guests}</span>
                        )}
                    </div>

                    {serverError && (
                        <p className="form-error-global">{serverError}</p>
                    )}

                    {success && <p className="form-success">{success}</p>}

                    <div className="reservations__button-wrapper">
                        <button type="submit" className="reservations__btn" disabled={loading}>
                            {loading ? "Отправка..." : "Забронировать"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
