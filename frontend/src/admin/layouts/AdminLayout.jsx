import {
  useState,
} from "react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiMenu,
  FiX,
  FiGrid,
  FiBriefcase,
  FiLayers,
  FiMessageSquare,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import "../../admin/styles/adminLayout.css";


// ============================================================
// SIDEBAR LINKS
// ============================================================
const navItems = [

  {
    name: "Dashboard",
    path: "/studio-admin",
    icon: <FiGrid />,
  },

  {
    name: "Projects",
    path: "/studio-admin/projects",
    icon: <FiBriefcase />,
  },

  {
    name: "Services",
    path: "/studio-admin/services",
    icon: <FiLayers />,
  },

  {
    name: "Messages",
    path: "/studio-admin/messages",
    icon: <FiMessageSquare />,
  },

  {
    name: "Bookings",
    path: "/studio-admin/bookings",
    icon: <FiCalendar />,
  },

  {
    name: "Users",
    path: "/studio-admin/users",
    icon: <FiUsers />,
  },

  {
    name: "Settings",
    path: "/studio-admin/settings",
    icon: <FiSettings />,
  },

];


// ============================================================
// COMPONENT
// ============================================================
function AdminLayout() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);


  // ==========================================================
  // TOGGLE SIDEBAR
  // ==========================================================
  const toggleSidebar =
    () => {

      setSidebarOpen(
        !sidebarOpen
      );
    };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="admin-layout">

      {/* ======================================================
          SIDEBAR
      ======================================================= */}
      <aside
        className={`
          admin-sidebar
          ${sidebarOpen
            ? "active"
            : ""}
        `}
      >

        {/* LOGO */}
        <div className="admin-sidebar__logo">

          <h2>
            InteriorX
          </h2>

          <span>
            Admin Panel
          </span>

        </div>


        {/* NAVIGATION */}
        <nav className="admin-sidebar__nav">

          {navItems.map(
            (
              item,
              index
            ) => (

            <NavLink
              key={index}

              to={item.path}

              end={
                item.path ===
                "/studio-admin"
              }

              className={({
                isActive,
              }) =>
                `
                admin-sidebar__link
                ${
                  isActive
                    ? "active"
                    : ""
                }
              `
              }

              onClick={() =>
                setSidebarOpen(
                  false
                )
              }
            >

              <span className="admin-sidebar__icon">

                {item.icon}

              </span>

              <span>

                {item.name}

              </span>

            </NavLink>
          ))}

        </nav>


        {/* FOOTER */}
        <div className="admin-sidebar__footer">

          <button
            className="
              admin-sidebar__logout
            "
          >

            <FiLogOut />

            Logout

          </button>

        </div>

      </aside>


      {/* ======================================================
          MOBILE OVERLAY
      ======================================================= */}
      <AnimatePresence>

        {sidebarOpen && (

          <motion.div
            className="
              admin-overlay
            "

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            onClick={
              toggleSidebar
            }
          />

        )}

      </AnimatePresence>


      {/* ======================================================
          MAIN
      ======================================================= */}
      <div className="admin-main">

        {/* ==================================================
            TOPBAR
        =================================================== */}
        <header className="admin-topbar">

          {/* LEFT */}
          <div className="admin-topbar__left">

            <button
              className="
                admin-menu-btn
              "

              onClick={
                toggleSidebar
              }
            >

              {sidebarOpen
                ? <FiX />
                : <FiMenu />}

            </button>


            <div>

              <h1>
                Studio Dashboard
              </h1>

              <p>
                Luxury Interior
                Management System
              </p>

            </div>

          </div>


          {/* RIGHT */}
          <div className="admin-topbar__right">

            <div
              className="
                admin-profile
              "
            >

              <div
                className="
                  admin-profile__avatar
                "
              >

                A

              </div>

              <div>

                <h4>
                  Admin
                </h4>

                <span>
                  Super Admin
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* ==================================================
            CONTENT
        =================================================== */}
        <main className="admin-content">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;