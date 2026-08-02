import { BrowserRouter, Navigate, Route, Routes, HashRouter } from "react-router-dom";

import MainLayout from "@renderer/layouts/MainLayout";

import DashboardPage from "@renderer/pages/Dashboard/DashboardPage";
import MenuPage from "@renderer/pages/Menu/MenuPage";
import OrdersPage from "@renderer/pages/Orders/OrdersPage";
import ReportsPage from "@renderer/pages/Reports/ReportsPage";
import SettingsPage from "@renderer/pages/Settings/SettingsPage";
import OrderHistoryPage from "@renderer/pages/Orders/History/OrderHistoryPage";
import ActiveOrdersPage from "@renderer/pages/ActiveOrders/ActiveOrdersPage";

function AppRouter() {

  const Router = window.electron
    ? HashRouter
    : BrowserRouter;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/active-orders" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/active-orders" element={<ActiveOrdersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reports/orders/history" element={<OrderHistoryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter;
