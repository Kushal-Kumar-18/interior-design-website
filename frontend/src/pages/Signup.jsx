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

  FiUser,

  FiMail,

  FiLock,

  FiArrowRight,

} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";

import "../styles/pages/signup.css";

// ============================================================
// COMPONENT
// ============================================================
function Signup() {

  const navigate =
    useNavigate();

  const {
    signup,
  } = useAuth();

  // ==========================================================
  // STATE
  // ==========================================================
  const [formData,
    setFormData] =
    useState({

      full_name: "",

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
  // CHANGE
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
        await signup(
          formData
        );

      if (result.success) {

        navigate(
          "/home"
        );

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

    <div className="
      signup-page
    ">

      {/* LEFT */}
      <div className="
        signup-left
      ">

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

          <span className="
            signup-badge
          ">

            Luxury Interior Platform

          </span>

          <h1>

            Create Your
            InteriorX Account

          </h1>

          <p>

            Save consultations,
            manage bookings,
            explore premium
            interior inspirations,
            and access your
            personalized dashboard.

          </p>

        </motion.div>

      </div>

      {/* RIGHT */}
      <div className="
        signup-right
      ">

        <motion.div
          className="
            signup-card
          "

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

          {/* TITLE */}
          <div className="
            signup-header
          ">

            <h2>
              Sign Up
            </h2>

            <p>
              Create your account
              to continue.
            </p>

          </div>

          {/* ERROR */}
          {error && (

            <div className="
              signup-error
            ">

              {error}

            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={
              handleSubmit
            }

            className="
              signup-form
            "
          >

            {/* NAME */}
            <div className="
              signup-input
            ">

              <FiUser />

              <input
                type="text"

                name="full_name"

                placeholder="
                  Full Name
                "

                value={
                  formData.full_name
                }

                onChange={
                  handleChange
                }

                required
              />

            </div>

            {/* EMAIL */}
            <div className="
              signup-input
            ">

              <FiMail />

              <input
                type="email"

                name="email"

                placeholder="
                  Email Address
                "

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }

                required
              />

            </div>

            {/* PASSWORD */}
            <div className="
              signup-input
            ">

              <FiLock />

              <input
                type="password"

                name="password"

                placeholder="
                  Password
                "

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }

                required
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"

              className="
                signup-btn
              "

              disabled={
                loading
              }
            >

              {loading

                ? "Creating Account..."

                : (
                  <>
                    Create Account

                    <FiArrowRight />
                  </>
                )}

            </button>

          </form>

          {/* LOGIN */}
          <div className="
            signup-footer
          ">

            Already have
            an account?

            <Link to="/">

              Login

            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Signup;