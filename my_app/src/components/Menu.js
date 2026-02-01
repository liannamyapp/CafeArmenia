import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://cafearmenia.onrender.com/api/menu";

const Menu = () => {
    const { admin } = useContext(AuthContext);
    const isAdmin = !!admin;

    const [menuItems, setMenuItems] = useState([]);
    const [openItems, setOpenItems] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [itemIndex, setItemIndex] = useState(null);

    // ---------- FETCH ----------
    const fetchMenu = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setMenuItems(data);
            setOpenItems(Array(data.length).fill(true));
        } catch (err) {
            console.error("Menu fetch error:", err);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    // ---------- ACCORDION ----------
    const toggleItem = (index) => {
        setOpenItems((prev) =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    // ---------- MODAL ----------
    const openEditModal = (catId, index) => {
        console.log("OPEN MODAL", catId, index);

        const category = menuItems.find((c) => c._id === catId);
        if (!category || !category.content?.[index]) return;

        setSelectedItem({ ...category.content[index] });
        setCategoryId(catId);
        setItemIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setCategoryId(null);
        setItemIndex(null);
    };

    const updateItem = async () => {
        if (!selectedItem) return;

        await fetch(
            `${API_URL}/${categoryId}/item/${itemIndex}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedItem),
            }
        );

        closeModal();
        fetchMenu();
    };

    const deleteItem = async (catId, index) => {
        if (!window.confirm("Вы уверены, что хотите удалить?")) return;

        await fetch(
            `${API_URL}/${catId}/item/${index}`,
            { method: "DELETE" }
        );

        fetchMenu();
    };

    // ---------- RENDER ----------
    return (
        <div className="menu">
            <div className="menu__container">
                <h2>Наше меню</h2>

                {menuItems.map((category, index) => (
                    <div key={category._id} className="accordion-item">
                        <div
                            className="accordion-title"
                            onClick={() => toggleItem(index)}
                        >
                            <h3>{category.title}</h3>
                            <span>{openItems[index] ? "−" : "+"}</span>
                        </div>

                        <div
                            className={`accordion-content ${openItems[index] ? "open" : ""}`}
                            style={{ maxHeight: openItems[index] ? "2000px" : "0" }}
                        >
                            <div className="cards-grid">
                                {Array.isArray(category.content) &&
                                    category.content.map((dish, i) => (
                                        <div className="card" key={i}>
                                            {dish.image && (
                                                <img
                                                    src={dish.image ? `${API_URL}${dish.image}` : "/placeholder.png"}
                                                    alt={dish.name}
                                                />

                                            )}

                                            <h4>{dish.name}</h4>
                                            <p>{dish.description}</p>
                                            {dish.price && <p>{dish.price}</p>}

                                            {isAdmin && (
                                                <div className="card__actions">
                                                    <button 
                                                    className="edit"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openEditModal(category._id, i);
                                                        }}
                                                    >
                                                        ✏️ Редактировать
                                                    </button>

                                                    <button
                                                     className="delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteItem(category._id, i);
                                                        }}
                                                    >
                                                        🗑 Удалить
                                                    </button>
                                                </div>

                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---------- MODAL ---------- */}
            {isModalOpen && selectedItem && (
                <div className="modal">
                    <div className="modal__content">
                        <h3>Редактировать блюдо</h3>

                        <input
                            value={selectedItem.name || ""}
                            onChange={(e) =>
                                setSelectedItem({ ...selectedItem, name: e.target.value })
                            }
                            placeholder="Название"
                        />

                        <textarea
                            value={selectedItem.description || ""}
                            onChange={(e) =>
                                setSelectedItem({ ...selectedItem, description: e.target.value })
                            }
                            placeholder="Описание"
                        />

                        <input
                            value={selectedItem.price || ""}
                            onChange={(e) =>
                                setSelectedItem({ ...selectedItem, price: e.target.value })
                            }
                            placeholder="Цена"
                        />

                        <div className="modal__actions">
                            <button onClick={updateItem}>Сохранить</button>
                            <button onClick={closeModal}>Закрыть</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
