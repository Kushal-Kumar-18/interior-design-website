import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// ============================================================
// LAYOUT
// ============================================================
import AdminLayout from "../layouts/AdminLayout";


// ============================================================
// PAGES
// ============================================================
import AdminLogin from "../pages/AdminLogin";

import Dashboard from "../pages/Dashboard";

import Projects from "../pages/Projects";

import ServicesAdmin from "../pages/ServicesAdmin";

import Bookings from "../pages/Bookings";

import Messages from "../pages/Messages";

import Settings from "../pages/Settings";

import Users from "../pages/Users";


// ============================================================
// PROTECTION
// ============================================================
import ProtectedAdminRoute from "./ProtectedAdminRoute";


// ============================================================
// COMPONENT
// ============================================================
function AdminRoutes() {

  return (

    <Routes>

      {/* ====================================================
          ADMIN LOGIN
      ===================================================== */}
      <Route
        path="/login"

        element={
          <AdminLogin />
        }
      />


      {/* ====================================================
          PROTECTED ADMIN
      ===================================================== */}
      <Route
        path="/"

        element={

          <ProtectedAdminRoute>

            <AdminLayout />

          </ProtectedAdminRoute>
        }
      >

        {/* DASHBOARD */}
        <Route
          index
          element={<Dashboard />}
        />

        {/* PROJECTS */}
        <Route
          path="projects"

          element={<Projects />}
        />

        {/* SERVICES */}
        <Route
          path="services"

          element={
            <ServicesAdmin />
          }
        />

        {/* BOOKINGS */}
        <Route
          path="bookings"

          element={<Bookings />}
        />

        {/* MESSAGES */}
        <Route
          path="messages"

          element={<Messages />}
        />

        {/* USERS */}
        <Route
          path="users"

          element={<Users />}
        />

        {/* SETTINGS */}
        <Route
          path="settings"

          element={<Settings />}
        />

      </Route>


      {/* ====================================================
          FALLBACK
      ===================================================== */}
      <Route
        path="*"

        element={
          <Navigate
            to="/admin"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AdminRoutes;