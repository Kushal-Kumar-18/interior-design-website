import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";

import "../styles/components/navbar.css";


// ============================================================
// NAV LINKS
// ============================================================
const NAV_LINKS = [

  {
    label: "Home",
    path: "/home"
  },

  {
    label: "Portfolio",
    path: "/portfolio"
  },

  {
    label: "Services",
    path: "/services"
  },

  {
    label: "Contact",
    path: "/contact"
  },
];


// ============================================================
// COMPONENT
// ============================================================
function Navbar() {

  // ==========================================================
  // AUTH
  // ==========================================================
  const {

    user,

    logout,

    isAuthenticated,

  } = useAuth();


  // ==========================================================
  // STATE
  // ==========================================================
  const [scrolled,
    setScrolled] =
    useState(false);

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const [hidden,
    setHidden] =
    useState(false);

  const location =
    useLocation();

  const navigate =
    useNavigate();


  // ==========================================================
  // SCROLL DETECTION
  // ==========================================================
  useEffect(() => {

    let lastScroll =
      window.scrollY;

    const handleScroll =
      () => {

        const currentScroll =
          window.scrollY;

        setScrolled(
          currentScroll > 40
        );

        if (

          currentScroll >
            lastScroll &&

          currentScroll > 120

        ) {

          setHidden(true);

        } else {

          setHidden(false);
        }

        lastScroll =
          currentScroll;
      };

    window.addEventListener(

      "scroll",

      handleScroll,

      {
        passive: true
      }
    );

    return () =>

      window.removeEventListener(

        "scroll",

        handleScroll
      );

  }, []);


  // ==========================================================
  // CLOSE MOBILE MENU
  // ==========================================================
  useEffect(() => {

    setMenuOpen(false);

  }, [location.pathname]);


  // ==========================================================
  // BODY LOCK
  // ==========================================================
  useEffect(() => {

    document.body.style.overflow =

      menuOpen
        ? "hidden"
        : "";

    return () => {

      document.body.style.overflow = "";
    };

  }, [menuOpen]);


  // ==========================================================
  // ESCAPE KEY
  // ==========================================================
  useEffect(() => {

    const handleKey =
      (e) => {

        if (
          e.key === "Escape"
        ) {

          setMenuOpen(false);
        }
      };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>

      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, []);


  // ==========================================================
  // ACTIVE ROUTE
  // ==========================================================
  const isActive =
    (path) => {

      return location.pathname === path;
    };


  // ==========================================================
  // LOGOUT
  // ==========================================================
  const handleLogout =
    () => {

      logout();

      navigate("/");
    };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <>

      {/* ====================================================
          NAVBAR
      ===================================================== */}
      <header
        className={`
          navbar
          ${scrolled
            ? "scrolled"
            : ""}
          ${hidden
            ? "hidden"
            : ""}
        `}
      >

        <div className="
          navbar__container
        ">

          {/* ==================================================
              LOGO
          =================================================== */}
          <Link
            to="/home"

            className="
              navbar__logo
            "
          >

            Interior
            <span>X</span>

          </Link>


          {/* ==================================================
              DESKTOP NAV
          =================================================== */}
          <nav className="
            navbar__desktop
          ">

            <ul className="
              navbar__links
            ">

              {NAV_LINKS.map(
                ({
                  label,
                  path
                }) => (

                <li key={path}>

                  <Link
                    to={path}

                    className={
                      isActive(path)
                        ? "active"
                        : ""
                    }
                  >

                    {label}

                  </Link>

                </li>
              ))}

            </ul>

          </nav>


          {/* ==================================================
              AUTH
          =================================================== */}
          <div className="
            navbar__auth
          ">

            {isAuthenticated && (

              <>

                {/* PROFILE */}
                <button
                  className="
                    navbar__profile
                  "

                  onClick={() =>
                    navigate(
                      "/profile"
                    )
                  }
                >

                  <FiUser />

                  {
                    user?.full_name
                      ?.split(" ")[0]
                  }

                </button>


                {/* LOGOUT */}
                <button
                  className="
                    navbar__logout
                  "

                  onClick={
                    handleLogout
                  }
                >

                  <FiLogOut />

                </button>

              </>

            )}

          </div>


          {/* ==================================================
              MOBILE TOGGLE
          =================================================== */}
          <button
            className={`
              navbar__hamburger
              ${menuOpen
                ? "open"
                : ""}
            `}

            onClick={() =>
              setMenuOpen(
                (o) => !o
              )
            }
          >

            <span />
            <span />
            <span />

          </button>

        </div>

      </header>


      {/* ====================================================
          MOBILE MENU
      ===================================================== */}
      <AnimatePresence>

        {menuOpen && (

          <>

            {/* OVERLAY */}
            <motion.div
              className="
                navbar__overlay
              "

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              exit={{
                opacity: 0
              }}

              onClick={() =>
                setMenuOpen(false)
              }
            />


            {/* DRAWER */}
            <motion.aside
              className="
                navbar__mobile
              "

              initial={{
                x: "100%"
              }}

              animate={{
                x: 0
              }}

              exit={{
                x: "100%"
              }}
            >

              {/* ==================================================
                  LINKS
              =================================================== */}
              <div className="
                navbar__mobile__links
              ">

                {NAV_LINKS.map(
                  ({
                    label,
                    path
                  }, i) => (

                  <motion.div
                    key={path}

                    initial={{
                      opacity: 0,
                      x: 24,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay:
                        0.08 +
                        i * 0.05,
                    }}
                  >

                    <Link
                      to={path}

                      className={
                        isActive(path)
                          ? "active"
                          : ""
                      }
                    >

                      {label}

                    </Link>

                  </motion.div>
                ))}

              </div>


              {/* ==================================================
                  MOBILE AUTH
              =================================================== */}
              <div className="
                navbar__mobile__bottom
              ">

                {isAuthenticated && (

                  <>

                    <button
                      className="
                        navbar__mobile__cta
                      "

                      onClick={() =>
                        navigate(
                          "/profile"
                        )
                      }
                    >

                      Profile

                    </button>

                    <button
                      className="
                        navbar__mobile__cta
                      "

                      onClick={
                        handleLogout
                      }
                    >

                      Logout

                    </button>

                  </>

                )}

              </div>

            </motion.aside>

          </>
        )}

      </AnimatePresence>

    </>
  );
}

export default Navbar;