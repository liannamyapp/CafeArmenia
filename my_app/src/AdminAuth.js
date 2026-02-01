import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const API_URL = "https://cafearmenia.onrender.com/api/admin";
const AdminAuth = () => {
    const { admin, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // եթե admin կա → կարող է ստեղծել նոր admin
    const canCreateAdmin = !!admin;

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                `${API_URL}/${isLogin ? "login" : "register"}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(admin && {
                            Authorization: `Bearer ${admin.token}`,
                        }),
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Error");
                setLoading(false);
                return;
            }

            if (isLogin) {
                login(data); // { token, email, role }
                navigate("/admin/dashboard");
            } else {
                alert("New admin created successfully");
                setFormData({ email: "", password: "" });
            }
        } catch (err) {
            setError("Server error");
        }

        setLoading(false);
    };

    return (
        <div className="admin">
            <form onSubmit={handleSubmit}>
                <h2>
                    {isLogin ? "Admin Login" : "Create Admin"}
                </h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Please wait..."
                        : isLogin
                            ? "Login"
                            : "Create Admin"}
                </button>

                {/* ⛔ Create Admin-ը տեսանելի է միայն եթե արդեն admin ես */}
                {canCreateAdmin && (
                    <p>
                        {isLogin ? "Create new admin?" : "Back to login"}{" "}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            {isLogin ? "Create Admin" : "Login"}
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default AdminAuth;
