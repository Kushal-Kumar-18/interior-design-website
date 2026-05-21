import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  bookingAPI,
} from "../api/api";

import "../styles/components/booking-form.css";


// ============================================================
// INITIAL FORM
// ============================================================
const INITIAL_FORM = {

  full_name: "",

  email: "",

  phone: "",

  project_type: "",

  budget: "",

  message: "",
};


// ============================================================
// COMPONENT
// ============================================================
function BookingForm() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");


  // ==========================================================
  // CHANGE
  // ==========================================================
  const handleChange = (e) => {

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

      setSuccess("");

      setError("");

      try {

        const response =

          await bookingAPI.createBooking(
            formData
          );

        setSuccess(

          response?.message ||

          "Consultation booked successfully."
        );

        setFormData(
          INITIAL_FORM
        );

      } catch (err) {

        console.error(
          "Booking Form Error:",
          err
        );

        setError(

          err?.response?.data?.error ||

          "Failed to book consultation."
        );

      } finally {

        setLoading(false);
      }
    };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <section className="
      booking-form-section
    ">

      <motion.div
        className="
          booking-form
        "

        initial={{
          opacity: 0,
          y: 30,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}
      >

        {/* ==================================================
            HEADER
        =================================================== */}
        <div className="
          booking-form__header
        ">

          <div className="
            section-heading__eyebrow
          ">

            <span className="gold-line" />

            Consultation

            <span className="gold-line" />

          </div>

          <h2 className="
            booking-form__title
          ">

            Book A Design Consultation

          </h2>

          <p className="
            booking-form__description
          ">

            Schedule a personalized
            consultation with our
            luxury interior experts.

          </p>

        </div>


        {/* ==================================================
            ALERTS
        =================================================== */}
        {success && (

          <div className="
            booking-alert
            booking-alert--success
          ">

            {success}

          </div>
        )}

        {error && (

          <div className="
            booking-alert
            booking-alert--error
          ">

            {error}

          </div>
        )}


        {/* ==================================================
            FORM
        =================================================== */}
        <form
          className="
            booking-form__grid
          "

          onSubmit={handleSubmit}
        >

          {/* NAME */}
          <div className="booking-group">

            <label>
              Full Name
            </label>

            <input
              type="text"

              name="full_name"

              placeholder="Your Name"

              value={formData.full_name}

              onChange={handleChange}

              required
            />

          </div>


          {/* EMAIL */}
          <div className="booking-group">

            <label>
              Email Address
            </label>

            <input
              type="email"

              name="email"

              placeholder="you@example.com"

              value={formData.email}

              onChange={handleChange}

              required
            />

          </div>


          {/* PHONE */}
          <div className="booking-group">

            <label>
              Phone Number
            </label>

            <input
              type="tel"

              name="phone"

              placeholder="+91 9876543210"

              value={formData.phone}

              onChange={handleChange}

              required
            />

          </div>


          {/* PROJECT TYPE */}
          <div className="booking-group">

            <label>
              Project Type
            </label>

            <select
              name="project_type"

              value={formData.project_type}

              onChange={handleChange}
            >

              <option value="">
                Select Project Type
              </option>

              <option value="Living Room">
                Living Room
              </option>

              <option value="Bedroom">
                Bedroom
              </option>

              <option value="Kitchen">
                Kitchen
              </option>

              <option value="Villa">
                Villa Interior
              </option>

              <option value="Office">
                Office Space
              </option>

            </select>

          </div>


          {/* BUDGET */}
          <div className="booking-group">

            <label>
              Budget Range
            </label>

            <select
              name="budget"

              value={formData.budget}

              onChange={handleChange}
            >

              <option value="">
                Select Budget
              </option>

              <option value="5L-10L">
                ₹5L - ₹10L
              </option>

              <option value="10L-20L">
                ₹10L - ₹20L
              </option>

              <option value="20L-50L">
                ₹20L - ₹50L
              </option>

              <option value="50L+">
                ₹50L+
              </option>

            </select>

          </div>


          {/* MESSAGE */}
          <div className="
            booking-group
            booking-group--full
          ">

            <label>
              Additional Notes
            </label>

            <textarea
              name="message"

              rows="6"

              placeholder="
                Tell us more about your project...
              "

              value={formData.message}

              onChange={handleChange}
            />

          </div>


          {/* BUTTON */}
          <div className="
            booking-group
            booking-group--full
          ">

            <button
              type="submit"

              className="
                btn
                btn-primary
                booking-form__button
              "

              disabled={loading}
            >

              {loading

                ? "Booking..."

                : "Book Consultation"}

            </button>

          </div>

        </form>

      </motion.div>

    </section>
  );
}

export default BookingForm;