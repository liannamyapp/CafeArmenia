import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/all", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(setAdmins);
    }, [token]);

    const deleteAdmin = async (id) => {
        await fetch(`http://localhost:5000/api/admin/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(admins.filter(a => a._id !== id));
    };

    return (
        <div  className="pages">
            <Sidebar />
            <div >
                <h2>Администраторы</h2>

                {admins.map(a => (
                    <div key={a._id} style={{ marginBottom: "10px" }}>
                        {a.email} ({a.role})
                        <button onClick={() => deleteAdmin(a._id)} style={{ marginLeft: "10px" }}>
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admins;
