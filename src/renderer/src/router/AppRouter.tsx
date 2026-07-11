import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@renderer/layouts/MainLayout";

import DashboardPage from "@renderer/pages/Dashboard/DashboardPage";
import MenuPage from "@renderer/pages/Menu/MenuPage";
import OrdersPage from "@renderer/pages/Orders/OrdersPage";
import ReportsPage from "@renderer/pages/Reports/ReportsPage";
import SettingsPage from "@renderer/pages/Settings/SettingsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
