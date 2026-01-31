import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard";
import DataCrud from "../pages/DataCrud";
import ChangePassword from "../pages/ChangePassword";
import Admins from "../pages/Admins";
import Menuitem from "../pages/Menuitem";

const Sidebar = () => {
    const { admin, logout, open, dark, setDark } = useContext(AuthContext);
    const [active, setActive] = useState("dashboard");

    if (!open) return null;

    return (
        <div
            className="adminPanel"
            style={{
                background: dark ? "#12121b" : "white",
                color: dark ? "white" : "black",
                display: "flex",
            }}
        >
            {/* LEFT MENU */}
            <div className="adminMenu">
                <h3>Панель администратора</h3>

                <button onClick={() => setActive("dashboard")}>
                    Панель управления
                </button>

                <button onClick={() => setActive("data")}>
                    Данные
                </button>

                <button onClick={() => setActive("password")}>
                    Сменить пароль
                </button>

                <button onClick={() => setActive("addmenuItem")}>
                    Добавить пункт меню
                </button>

                {admin?.role === "superAdmin" && (
                    <button onClick={() => setActive("admins")}>
                        Администраторы
                    </button>
                )}

                <button
                    onClick={() =>
                        setDark(prev => {
                            const v = !prev;
                            localStorage.setItem("dark", JSON.stringify(v));
                            return v;
                        })
                    }
                >
                    {dark ? "Светлая тема" : "Тёмная тема"}
                </button>

                <button onClick={logout}>
                    Выйти
                </button>
            </div>

            {/* RIGHT CONTENT */}
            <div className="adminContent">
                {active === "dashboard" && <Dashboard />}
                {active === "data" && <DataCrud />}
                {active === "password" && <ChangePassword />}
                {active === "addmenuItem" && <Menuitem />}
                {active === "admins" &&
                    admin?.role === "superAdmin" && <Admins />}
            </div>
        </div>
    );
};

export default Sidebar;
