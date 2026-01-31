import { useEffect, useState } from "react";
import '../styles/MenuIten.scss'
import { toast } from "react-toastify";

export default function MenuItem() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        categoryId: "",
        name: "",
        description: "",
        image: "",
        price: "",
    });

    // 🔹 Загрузка категорий
    useEffect(() => {
        fetch("http://localhost:5000/api/menu")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.categoryId) {
            alert("Выберите категорию меню");
            return;
        }

        const { categoryId, ...itemData } = form;

        try {
            const res = await fetch(
                `http://localhost:5000/api/menu/${categoryId}/item`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(itemData),
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success("Элемент успешно добавлен ✅");
                // Опционально сбросить форму
                setForm({
                    categoryId: "",
                    name: "",
                    description: "",
                    image: "",
                    price: "",
                });
            } else {
                toast.error(data.message || "Произошла ошибка ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Проблема с сервером ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="menu-form">
            <h3>Добавить элемент меню</h3>

            {/* 🔽 SELECT КАТЕГОРИИ */}
            <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
            >
                <option value="">— Выберите категорию меню —</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.title}
                    </option>
                ))}
            </select>

            <input
                name="name"
                placeholder="Название"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                name="description"
                placeholder="Описание"
                value={form.description}
                onChange={handleChange}
            />

            <input
                name="image"
                placeholder="/images/snack.jpg"
                value={form.image}
                onChange={handleChange}
                required
            />
            {form.image && (
                <div className="image-preview">
                    <img src={form.image} alt="preview" />
                </div>
            )}

            <input
                name="price"
                placeholder="Цена"
                value={form.price}
                onChange={handleChange}
            />

            <button type="submit">Добавить</button>
        </form>
    );
}
