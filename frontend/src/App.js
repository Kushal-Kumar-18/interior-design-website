import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

// ============================================================
// LAYOUT
// ============================================================
function Layout() {

  const location =
    useLocation();

  // ==========================================================
  // HIDE NAVBAR ROUTES
  // ==========================================================
  const hideLayoutRoutes = [

    "/",

    "/signup",
  ];

  const shouldHideLayout =
    hideLayoutRoutes.includes(
      location.pathname
    );

  return (

    <>

      {/* ====================================================
          NAVBAR
      ===================================================== */}
      {!shouldHideLayout && (
        <Navbar />
      )}

      {/* ====================================================
          ROUTES
      ===================================================== */}
      <Routes>

        {/* ==================================================
            LOGIN DEFAULT
        =================================================== */}
        <Route
          path="/"

          element={<Login />}
        />

        {/* ==================================================
            SIGNUP
        =================================================== */}
        <Route
          path="/signup"

          element={<Signup />}
        />

        {/* ==================================================
            HOME
        =================================================== */}
        <Route
          path="/home"

          element={<Home />}
        />

        {/* ==================================================
            SERVICES
        =================================================== */}
        <Route
          path="/services"

          element={<Services />}
        />

        {/* ==================================================
            PORTFOLIO
        =================================================== */}
        <Route
          path="/portfolio"

          element={<Portfolio />}
        />

        {/* ==================================================
            CONTACT
        =================================================== */}
        <Route
          path="/contact"

          element={<Contact />}
        />

        {/* ==================================================
            PROFILE
        =================================================== */}
        <Route
          path="/profile"

          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />

        {/* ==================================================
            404
        =================================================== */}
        <Route
          path="*"

          element={<NotFound />}
        />

      </Routes>

      {/* ====================================================
          FOOTER
      ===================================================== */}
      {!shouldHideLayout && (
        <Footer />
      )}

    </>
  );
}

// ============================================================
// APP
// ============================================================
function App() {

  return (

    <BrowserRouter>

      <ScrollToTop />

      <Layout />

    </BrowserRouter>
  );
}

export default App;