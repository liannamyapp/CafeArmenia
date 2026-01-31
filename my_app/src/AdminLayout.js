import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PrivateRoute from "../components/PrivateRoute";

import Dashboard from "../pages/Dashboard";
import DataCrud from "../pages/DataCrud";
import Admins from "../pages/Admins";
import ChangePassword from "../pages/ChangePassword";

const AdminLayout = () => {
    return (
        <div className="adminLayout">
            <Sidebar />

            <div className="adminContent">
                <Routes>
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="data"
                        element={
                            <PrivateRoute>
                                <DataCrud />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="admins"
                        element={
                            <PrivateRoute role="superAdmin">
                                <Admins />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="change-password"
                        element={
                            <PrivateRoute>
                                <ChangePassword />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default AdminLayout;
