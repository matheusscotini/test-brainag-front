import React from "react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard";
import ListProducers from "../pages/Producers/List";
import RegisterProducer from "../pages/Producers/Register";

const AppRoutes: React.FC = () => (
    <Routes >
        <Route
            path="dashboard"
            element={<Dashboard />}
        />

        <Route
            path="producers"
            element={<ListProducers />}
        />

        <Route
            path="producers/register"
            element={<RegisterProducer />}
        />

        <Route
            path="producers/register/:id"
            element={<RegisterProducer />}
        />

        <Route path="*" element={<Dashboard />} />
    </Routes>
);

export default AppRoutes;