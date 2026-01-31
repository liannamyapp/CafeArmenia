    import { Navigate } from "react-router-dom";
    import { useContext } from "react";
    import { AuthContext } from "../context/AuthContext";

    const PrivateRoute = ({ children, role }) => {
        const { admin } = useContext(AuthContext);

        // Եթե ոչ ադմին → ուղղի լոգին
        if (!admin) return <Navigate to="/login" />;

        // Եթե role-ի սահմանափակում կա, և admin.role չի համընկնում
        if (role && admin.role !== role) return <Navigate to="/dashboard" />;

        return children;
    };

    export default PrivateRoute;
