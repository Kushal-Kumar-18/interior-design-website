import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {

  FiSearch,

  FiCheck,

  FiX,

  FiEye,

  FiCalendar,

  FiTrash2,

} from "react-icons/fi";

import {
  bookingAPI,
} from "../../api/api";

import Loader from "../../components/Loader";

import "../styles/bookings.css";


// ============================================================
// COMPONENT
// ============================================================
function Bookings() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [
    selectedBooking,
    setSelectedBooking,
  ] = useState(null);


  // ==========================================================
  // FETCH BOOKINGS
  // ==========================================================
  const fetchBookings =
    async () => {

      try {

        setLoading(true);

        const response =

          await bookingAPI.getBookings();

        const safeBookings =

          response?.data ||

          [];

        setBookings(

          Array.isArray(
            safeBookings
          )
            ? safeBookings
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load bookings."
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchBookings();

  }, []);


  // ==========================================================
  // FILTERED BOOKINGS
  // ==========================================================
  const filteredBookings =
    useMemo(() => {

      return bookings.filter(
        (booking) =>

          booking.full_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          booking.project_type
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [bookings, search]);


  // ==========================================================
  // UPDATE STATUS
  // ==========================================================
  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await bookingAPI.updateBooking(
          id,
          { status }
        );

        await fetchBookings();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to update booking."
        );
      }
    };


  // ==========================================================
  // DELETE
  // ==========================================================
  const deleteBooking =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this booking?"
        );

      if (!confirmDelete) {

        return;
      }

      try {

        await bookingAPI.deleteBooking(
          id
        );

        await fetchBookings();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to delete booking."
        );
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader
        text="Loading Bookings"
      />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="
        admin-bookings-error
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

    <div className="
      admin-bookings
    ">

      {/* ====================================================
          HEADER
      ===================================================== */}
      <div className="
        bookings-header
      ">

        <div>

          <h1>
            Consultation Bookings
          </h1>

          <p>
            Manage all client
            consultation requests.
          </p>

        </div>

      </div>


      {/* ====================================================
          TOOLBAR
      ===================================================== */}
      <div className="
        bookings-toolbar
      ">

        <div className="
          bookings-search
        ">

          <FiSearch />

          <input
            type="text"

            placeholder="
              Search bookings...
            "

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* ====================================================
          GRID
      ===================================================== */}
      <div className="
        bookings-grid
      ">

        {filteredBookings.map(
          (
            booking,
            index
          ) => (

          <motion.div
            key={booking.id}

            className="
              booking-card
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
                index * 0.05,
            }}
          >

            {/* TOP */}
            <div className="
              booking-card__top
            ">

              <div className="
                booking-card__avatar
              ">

                {
                  booking.full_name?.[0]
                }

              </div>


              <div className={`
                booking-badge
                ${booking.status
                  ?.toLowerCase()}
              `}>

                {booking.status}

              </div>

            </div>


            {/* CONTENT */}
            <div className="
              booking-card__content
            ">

              <h3>

                {
                  booking.full_name
                }

              </h3>

              <h4>

                {
                  booking.project_type
                }

              </h4>

              <p>

                Budget:
                {" "}
                {
                  booking.budget
                }

              </p>

            </div>


            {/* DATE */}
            <div className="
              booking-card__date
            ">

              <FiCalendar />

              {new Date(
                booking.created_at
              ).toLocaleDateString()}

            </div>


            {/* ACTIONS */}
            <div className="
              booking-card__actions
            ">

              <button
                className="
                  approve-btn
                "

                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Approved"
                  )
                }
              >

                <FiCheck />

              </button>


              <button
                className="
                  reject-btn
                "

                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Rejected"
                  )
                }
              >

                <FiX />

              </button>


              <button
                className="
                  view-btn
                "

                onClick={() =>
                  setSelectedBooking(
                    booking
                  )
                }
              >

                <FiEye />

              </button>


              <button
                className="
                  delete-btn
                "

                onClick={() =>
                  deleteBooking(
                    booking.id
                  )
                }
              >

                <FiTrash2 />

              </button>

            </div>

          </motion.div>
        ))}

      </div>


      {/* ====================================================
          MODAL
      ===================================================== */}
      <AnimatePresence>

        {selectedBooking && (

          <motion.div
            className="
              admin-modal
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
          >

            {/* BACKDROP */}
            <div
              className="
                admin-modal__backdrop
              "

              onClick={() =>
                setSelectedBooking(
                  null
                )
              }
            />


            {/* CONTENT */}
            <motion.div
              className="
                admin-modal__content
              "

              initial={{
                opacity: 0,
                scale: 0.92,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                scale: 0.92,
              }}
            >

              <h2>
                Booking Details
              </h2>

              <div className="
                booking-details
              ">

                <p>

                  <strong>
                    Name:
                  </strong>

                  {
                    selectedBooking.full_name
                  }

                </p>

                <p>

                  <strong>
                    Email:
                  </strong>

                  {
                    selectedBooking.email
                  }

                </p>

                <p>

                  <strong>
                    Phone:
                  </strong>

                  {
                    selectedBooking.phone
                  }

                </p>

                <p>

                  <strong>
                    Project:
                  </strong>

                  {
                    selectedBooking.project_type
                  }

                </p>

                <p>

                  <strong>
                    Budget:
                  </strong>

                  {
                    selectedBooking.budget
                  }

                </p>

                <p>

                  <strong>
                    Status:
                  </strong>

                  {
                    selectedBooking.status
                  }

                </p>

                <p>

                  <strong>
                    Message:
                  </strong>

                  {
                    selectedBooking.message ||
                    "No message provided"
                  }

                </p>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default Bookings;