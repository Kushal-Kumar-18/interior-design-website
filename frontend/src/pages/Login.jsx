import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";

import "../styles/pages/login.css";


// ============================================================
// COMPONENT
// ============================================================
function Login() {

  const navigate =
    useNavigate();

  const {
    login,
  } = useAuth();


  // ==========================================================
  // STATE
  // ==========================================================
  const [formData,
    setFormData] =
    useState({

      email: "",

      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");


  // ==========================================================
  // HANDLE CHANGE
  // ==========================================================
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };


  // ==========================================================
  // SUBMIT
  // ==========================================================
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

      const result =
        await login(
          formData
        );

      if (result.success) {

        navigate("/home");

      } else {

        setError(
          result.error
        );
      }

      setLoading(false);
    };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="login-page">

      {/* ====================================================
          LEFT SECTION
      ===================================================== */}
      <div className="login-left">

        <motion.div

          initial={{
            opacity: 0,
            x: -50,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.7,
          }}
        >

          <span className="login-badge">

            Welcome Back

          </span>

          <h1>

            Access Your
            InteriorX Account

          </h1>

          <p>

            Continue managing
            consultations,
            saved inspirations,
            premium projects,
            and personalized
            experiences.

          </p>

        </motion.div>

      </div>


      {/* ====================================================
          RIGHT SECTION
      ===================================================== */}
      <div className="login-right">

        <motion.div
          className="login-card"

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
          }}
        >

          {/* HEADER */}
          <div className="login-header">

            <h2>
              Login
            </h2>

            <p>
              Sign in to continue
              your luxury experience.
            </p>

          </div>


          {/* ERROR */}
          {error && (

            <div className="login-error">

              {error}

            </div>
          )}


          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* EMAIL */}
            <div className="login-input">

              <FiMail />

              <input
                type="email"

                name="email"

                placeholder="Email Address"

                value={formData.email}

                onChange={handleChange}

                autoComplete="email"

                spellCheck="false"

                required
              />

            </div>


            {/* PASSWORD */}
            <div className="login-input">

              <FiLock />

              <input
                type="password"

                name="password"

                placeholder="Password"

                value={formData.password}

                onChange={handleChange}

                autoComplete="current-password"

                spellCheck="false"

                required
              />

            </div>


            {/* BUTTON */}
            <button
              type="submit"

              className="login-btn"

              disabled={loading}
            >

              {loading

                ? "Signing In..."

                : (
                  <>
                    Login

                    <FiArrowRight />
                  </>
                )}

            </button>

          </form>


          {/* FOOTER */}
          <div className="login-footer">

            Don't have
            an account?

            <Link to="/signup">

              Create Account

            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;