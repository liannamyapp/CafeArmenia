import { useEffect, useState } from "react";

const DataCrud = () => {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetch("http://localhost:5000/api/items", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(setItems);
    }, [token]);

    const addItem = async () => {
        const res = await fetch("http://localhost:5000/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title }),
        });
        const data = await res.json();
        setItems([...items, data]);
    };

    return (
        <div className="pages" >
           
                <h2>CRUD данные</h2>

                <input
                    placeholder="Введите название"
                    onChange={e => setTitle(e.target.value)}
                />
                <button onClick={addItem}>Добавить</button>

                {items.map(i => (
                    <p key={i._id}>{i.title}</p>
                ))}
           
        </div>
    );
};

export default DataCrud;
