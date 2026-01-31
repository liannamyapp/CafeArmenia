import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function HeaderSection() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const { admin, open, setOpen } = useContext(AuthContext);

    const handleAdminToggle = () => {
        setOpen(prev => {
            const newValue = !prev;
            localStorage.setItem("open", JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <>
            <header className="header">
                <div className="header__container">
                    {/* Burger */}
                    <div className="burger-menu" onClick={() => setIsBurgerOpen(prev => !prev)}>
                        {isBurgerOpen ? "✕" : "☰"}
                    </div>

                    {/* Logo */}
                    <div className="header__logo">
                        Ресторан <a href="/">«Армения»</a>
                    </div>

                    {/* Navigation */}
                    <nav className={`header__nav ${isBurgerOpen ? "active" : ""}`}>
                        <ul>
                            <li onClick={() => setIsBurgerOpen(false)}><a href="/">Главная</a></li>
                            <li onClick={() => setIsBurgerOpen(false)}><a href="#menu"> Меню</a></li>
                            <li onClick={() => setIsBurgerOpen(false)}><a href="#about">О нас</a></li>
                            <li onClick={() => setIsBurgerOpen(false)}><a href="#booking">Бронирование</a></li>
                            <li onClick={() => setIsBurgerOpen(false)}><a href="#contact">Контакты</a></li>
                        </ul>
                    </nav>

                    {/* Admin Button */}
                    {admin ? (
                        <button onClick={handleAdminToggle}>
                            {open ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                        </button>
                    ) : (
                        <a href="/admin" className="header__btn">Вход</a>
                    )}
                </div>
            </header>

        </>
    );
}
