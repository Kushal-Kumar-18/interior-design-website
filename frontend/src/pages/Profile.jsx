import {
  motion,
} from "framer-motion";

import {

  FiUser,

  FiMail,

  FiPhone,

  FiCalendar,

  FiLogOut,

} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import "../styles/pages/profile.css";

// ============================================================
// COMPONENT
// ============================================================
function Profile() {

  // ==========================================================
  // AUTH
  // ==========================================================
  const {

    user,

    logout,

  } = useAuth();

  const navigate =
    useNavigate();


  // ==========================================================
  // LOGOUT
  // ==========================================================
  const handleLogout =
    () => {

      logout();

      navigate(
        "/login"
      );
    };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="
      profile-page
    ">

      <div className="
        profile-container
      ">

        {/* ==================================================
            HERO
        =================================================== */}
        <motion.div
          className="
            profile-hero
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

          {/* AVATAR */}
          <div className="
            profile-avatar
          ">

            <img

              src={
                user?.profile_image
              }

              alt={
                user?.full_name
              }
            />

          </div>


          {/* INFO */}
          <div className="
            profile-hero__info
          ">

            <h1>

              {
                user?.full_name
              }

            </h1>

            <p>

              Welcome back to
              InteriorX.

            </p>

          </div>

        </motion.div>


        {/* ==================================================
            DETAILS
        =================================================== */}
        <motion.div
          className="
            profile-card
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
            delay: 0.1,
          }}
        >

          <div className="
            profile-card__header
          ">

            <h2>
              Account Details
            </h2>

          </div>


          {/* USER DETAILS */}
          <div className="
            profile-details
          ">

            {/* NAME */}
            <div className="
              profile-detail
            ">

              <div className="
                profile-detail__icon
              ">

                <FiUser />

              </div>

              <div>

                <span>
                  Full Name
                </span>

                <h4>

                  {
                    user?.full_name
                  }

                </h4>

              </div>

            </div>


            {/* EMAIL */}
            <div className="
              profile-detail
            ">

              <div className="
                profile-detail__icon
              ">

                <FiMail />

              </div>

              <div>

                <span>
                  Email Address
                </span>

                <h4>

                  {
                    user?.email
                  }

                </h4>

              </div>

            </div>


            {/* PHONE */}
            <div className="
              profile-detail
            ">

              <div className="
                profile-detail__icon
              ">

                <FiPhone />

              </div>

              <div>

                <span>
                  Phone Number
                </span>

                <h4>

                  {
                    user?.phone ||
                    "Not Added"
                  }

                </h4>

              </div>

            </div>


            {/* CREATED */}
            <div className="
              profile-detail
            ">

              <div className="
                profile-detail__icon
              ">

                <FiCalendar />

              </div>

              <div>

                <span>
                  Member Since
                </span>

                <h4>

                  {new Date(
                    user?.created_at
                  ).toLocaleDateString()}

                </h4>

              </div>

            </div>

          </div>


          {/* LOGOUT */}
          <button
            className="
              logout-btn
            "

            onClick={
              handleLogout
            }
          >

            <FiLogOut />

            Logout

          </button>

        </motion.div>

      </div>

    </div>
  );
}

export default Profile;