import { useState } from "react";
import AdminRegister from "./AdminRegister";

const ChangePassword = () => {
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("adminToken");

        const res = await fetch(
            "http://localhost:5000/api/admin/change-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            }
        );

        const result = await res.json();
        alert(result.message);
    };

    return (
        <div className="pages">
            <form onSubmit={handleSubmit} >
                <h2>Смена пароля</h2>

                <input
                    type="password"
                    placeholder="Старый пароль"
                    onChange={(e) =>
                        setData({ ...data, oldPassword: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Новый пароль"
                    onChange={(e) =>
                        setData({ ...data, newPassword: e.target.value })
                    }
                />

                <button>Сменить пароль</button>
            </form>
            <AdminRegister/>
        </div>
    );
};

export default ChangePassword;
