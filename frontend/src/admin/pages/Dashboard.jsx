import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {

  FiBriefcase,

  FiLayers,

  FiMessageSquare,

  FiCalendar,

  FiTrendingUp,

  FiUsers,

} from "react-icons/fi";

import {

  projectAPI,

  serviceAPI,

  bookingAPI,

  contactAPI,

} from "../../api/api";

import Loader from "../../components/Loader";

import "../styles/dashboard.css";


// ============================================================
// COMPONENT
// ============================================================
function Dashboard() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [projects, setProjects] =
    useState([]);

  const [services, setServices] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // ==========================================================
  // FETCH DASHBOARD DATA
  // ==========================================================
  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          setLoading(true);

          const [

            projectsRes,

            servicesRes,

            bookingsRes,

            messagesRes,

          ] = await Promise.all([

            projectAPI.getProjects(),

            serviceAPI.getServices(),

            bookingAPI.getBookings(),

            contactAPI.getMessages(),

          ]);


          setProjects(

            projectsRes?.data || []
          );

          setServices(

            servicesRes?.data || []
          );

          setBookings(

            bookingsRes?.data || []
          );

          setMessages(

            messagesRes?.data || []
          );

        } catch (err) {

          console.error(err);

          setError(
            "Failed to load dashboard."
          );

        } finally {

          setLoading(false);
        }
      };

    fetchDashboard();

  }, []);


  // ==========================================================
  // STATS
  // ==========================================================
  const stats =
    useMemo(() => [

      {
        title:
          "Total Projects",

        value:
          projects.length,

        icon:
          <FiBriefcase />,

        growth:
          "+12%",
      },

      {
        title:
          "Services",

        value:
          services.length,

        icon:
          <FiLayers />,

        growth:
          "+4%",
      },

      {
        title:
          "Messages",

        value:
          messages.length,

        icon:
          <FiMessageSquare />,

        growth:
          "+18%",
      },

      {
        title:
          "Bookings",

        value:
          bookings.length,

        icon:
          <FiCalendar />,

        growth:
          "+9%",
      },

    ], [

      projects,

      services,

      messages,

      bookings,
    ]);


  // ==========================================================
  // RECENT BOOKINGS
  // ==========================================================
  const recentBookings =
    bookings.slice(0, 5);


  // ==========================================================
  // RECENT MESSAGES
  // ==========================================================
  const recentMessages =
    messages.slice(0, 5);


  // ==========================================================
  // UNREAD
  // ==========================================================
  const unreadMessages =
    messages.filter(
      (msg) => !msg.is_read
    ).length;


  // ==========================================================
  // FEATURED PROJECTS
  // ==========================================================
  const featuredProjects =
    projects.filter(
      (project) =>
        project.featured
    ).length;


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader
        text="Loading Dashboard"
      />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="
        dashboard-error
      ">

        <h2>
          {error}
        </h2>

      </div>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="dashboard">

      {/* ====================================================
          HEADER
      ===================================================== */}
      <div className="
        dashboard-header
      ">

        <div>

          <h1>
            Dashboard Overview
          </h1>

          <p>
            Welcome back to your
            luxury interior CMS.
          </p>

        </div>


        <button
          className="
            dashboard-header__btn
          "
        >

          <FiTrendingUp />

          Live Analytics

        </button>

      </div>


      {/* ====================================================
          STATS
      ===================================================== */}
      <div className="
        dashboard-stats
      ">

        {stats.map(
          (
            item,
            index
          ) => (

          <motion.div
            key={index}

            className="
              dashboard-stat
            "

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay:
                index * 0.08,
            }}
          >

            {/* TOP */}
            <div className="
              dashboard-stat__top
            ">

              <div className="
                dashboard-stat__icon
              ">

                {item.icon}

              </div>

              <span className="
                dashboard-stat__growth
              ">

                {item.growth}

              </span>

            </div>


            {/* VALUE */}
            <h2>

              {item.value}

            </h2>


            {/* TITLE */}
            <p>

              {item.title}

            </p>

          </motion.div>
        ))}

      </div>


      {/* ====================================================
          GRID
      ===================================================== */}
      <div className="
        dashboard-grid
      ">

        {/* BOOKINGS */}
        <motion.div
          className="
            dashboard-card
          "

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div className="
            dashboard-card__header
          ">

            <h3>
              Recent Bookings
            </h3>

            <span>

              {bookings.length}
              {" "}
              Total

            </span>

          </div>


          <div className="
            dashboard-bookings
          ">

            {recentBookings.map(
              (booking) => (

              <div
                key={booking.id}

                className="
                  dashboard-booking
                "
              >

                <div>

                  <h4>

                    {
                      booking.full_name
                    }

                  </h4>

                  <p>

                    {
                      booking.project_type
                    }

                  </p>

                </div>

                <div className={`
                  booking-status
                  ${booking.status
                    ?.toLowerCase()}
                `}>

                  {booking.status}

                </div>

              </div>
            ))}

          </div>

        </motion.div>


        {/* MESSAGES */}
        <motion.div
          className="
            dashboard-card
          "

          initial={{
            opacity: 0,
            y: 30,
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
            dashboard-card__header
          ">

            <h3>
              Recent Messages
            </h3>

            <span>

              {unreadMessages}
              {" "}
              Unread

            </span>

          </div>


          <div className="
            dashboard-messages
          ">

            {recentMessages.map(
              (message) => (

              <div
                key={message.id}

                className="
                  dashboard-message
                "
              >

                <div className="
                  dashboard-message__avatar
                ">

                  {
                    message.name?.[0]
                  }

                </div>

                <div>

                  <h4>

                    {
                      message.name
                    }

                  </h4>

                  <p>

                    {
                      message.message
                        ?.slice(0, 60)
                    }

                    ...

                  </p>

                </div>

              </div>
            ))}

          </div>

        </motion.div>

      </div>


      {/* ====================================================
          BOTTOM GRID
      ===================================================== */}
      <div className="
        dashboard-bottom
      ">

        {/* PERFORMANCE */}
        <motion.div
          className="
            dashboard-performance
          "

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div className="
            dashboard-performance__header
          ">

            <h3>
              Featured Portfolio
            </h3>

            <span>

              {
                featuredProjects
              }
              {" "}
              Projects

            </span>

          </div>


          <div className="
            dashboard-performance__graph
          ">

            <div className="graph-bar h1" />
            <div className="graph-bar h2" />
            <div className="graph-bar h3" />
            <div className="graph-bar h4" />
            <div className="graph-bar h5" />
            <div className="graph-bar h6" />
            <div className="graph-bar h7" />

          </div>

        </motion.div>


        {/* USERS */}
        <motion.div
          className="
            dashboard-users
          "

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.2,
          }}
        >

          <div className="
            dashboard-users__icon
          ">

            <FiUsers />

          </div>

          <h2>

            {
              bookings.length +
              messages.length
            }

          </h2>

          <p>
            Active Leads &
            Customer Inquiries
          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Dashboard;