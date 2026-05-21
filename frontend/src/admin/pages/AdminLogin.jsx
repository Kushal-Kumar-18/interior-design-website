import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {

  FiMail,

  FiLock,

  FiShield,

  FiArrowRight,

} from "react-icons/fi";

import axios from "axios";

import "../styles/adminLogin.css";

// ============================================================
// API
// ============================================================
const API_URL =

  "http://127.0.0.1:5000/api/auth/admin/login";


// ============================================================
// COMPONENT
// ============================================================
function AdminLogin() {

  // ==========================================================
  // NAVIGATION
  // ==========================================================
  const navigate =
    useNavigate();


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

      setLoading(true);

      setError("");

      try {

        const response =
          await axios.post(

            API_URL,

            formData
          );

        // ====================================================
        // TOKEN
        // ====================================================
        localStorage.setItem(

          "adminToken",

          response.data.token
        );

        localStorage.setItem(

          "adminUser",

          JSON.stringify(
            response.data.admin
          )
        );

        // ====================================================
        // REDIRECT
        // ====================================================
        navigate("/admin");

      } catch (err) {

        console.error(err);

        setError(

          err.response?.data?.error ||

          "Admin login failed"
        );

      } finally {

        setLoading(false);
      }
    };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="
      admin-login-page
    ">

      <motion.div
        className="
          admin-login-card
        "

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        {/* ICON */}
        <div className="
          admin-login__icon
        ">

          <FiShield />

        </div>


        {/* HEADER */}
        <div className="
          admin-login__header
        ">

          <h1>
            Admin Portal
          </h1>

          <p>
            Secure access to
            InteriorX CMS
          </p>

        </div>


        {/* ERROR */}
        {error && (

          <div className="
            admin-login-error
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
            admin-login-form
          "
        >

          {/* EMAIL */}
          <div className="
            admin-login-input
          ">

            <FiMail />

            <input
              type="email"

              name="email"

              placeholder="
                Admin Email
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
            admin-login-input
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
              admin-login-btn
            "

            disabled={
              loading
            }
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

      </motion.div>

    </div>
  );
}

export default AdminLogin;