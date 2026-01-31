import { useState } from "react";
import { toast } from "react-toastify";
import '../styles/AdminForm.scss';

export default function AdminRegister() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Пароли не совпадают ❌");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Админ успешно зарегистрирован ✅");
                setForm({ email: "", password: "", confirmPassword: "" });
            } else {
                toast.error(data.message || "Ошибка регистрации ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Ошибка сервера ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h3>Добавить админа</h3>

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={form.confirmPassword}
                onChange={handleChange}
                required
            />

            <button type="submit">Зарегистрировать</button>
        </form>
    );
}
