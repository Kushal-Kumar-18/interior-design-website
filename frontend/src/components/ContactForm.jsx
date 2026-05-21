import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  contactAPI,
} from "../api/api";

import "../styles/components/contact-form.css";


// ============================================================
// INITIAL FORM
// ============================================================
const INITIAL_FORM = {

  name: "",

  email: "",

  phone: "",

  subject: "",

  message: "",
};


// ============================================================
// COMPONENT
// ============================================================
function ContactForm() {

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
  // HANDLE CHANGE
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

        // ================================================
        // PAYLOAD
        // ================================================
        const payload = {

          name:
            formData.name,

          email:
            formData.email,

          subject:
            formData.subject,

          message:
            formData.message,
        };


        // ================================================
        // API
        // ================================================
        const response =

          await contactAPI.sendMessage(
            payload
          );


        // ================================================
        // SUCCESS
        // ================================================
        setSuccess(

          response?.message ||

          "Message sent successfully."
        );

        setFormData(
          INITIAL_FORM
        );

      } catch (err) {

        console.error(
          "Contact Form Error:",
          err
        );

        setError(

          err?.response?.data?.error ||

          "Failed to send message."
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
      contact-form-section
    ">

      <motion.div
        className="
          contact-form
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
          contact-form__header
        ">

          <div className="
            section-heading__eyebrow
          ">

            <span className="gold-line" />

            Get In Touch

            <span className="gold-line" />

          </div>

          <h2 className="
            contact-form__title
          ">

            Let’s Discuss Your Vision

          </h2>

          <p className="
            contact-form__description
          ">

            Share your ideas and
            requirements, and our
            design experts will
            connect with you.

          </p>

        </div>


        {/* ==================================================
            ALERTS
        =================================================== */}
        {success && (

          <div className="
            contact-alert
            contact-alert--success
          ">

            {success}

          </div>
        )}

        {error && (

          <div className="
            contact-alert
            contact-alert--error
          ">

            {error}

          </div>
        )}


        {/* ==================================================
            FORM
        =================================================== */}
        <form
          className="
            contact-form__grid
          "

          onSubmit={handleSubmit}
        >

          {/* NAME */}
          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"

              name="name"

              placeholder="Your Name"

              value={formData.name}

              onChange={handleChange}

              required
            />

          </div>


          {/* EMAIL */}
          <div className="form-group">

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
          <div className="form-group">

            <label>
              Phone Number
            </label>

            <input
              type="tel"

              name="phone"

              placeholder="+91 9876543210"

              value={formData.phone}

              onChange={handleChange}
            />

          </div>


          {/* SUBJECT */}
          <div className="form-group">

            <label>
              Subject
            </label>

            <input
              type="text"

              name="subject"

              placeholder="Project Inquiry"

              value={formData.subject}

              onChange={handleChange}
            />

          </div>


          {/* MESSAGE */}
          <div className="
            form-group
            form-group--full
          ">

            <label>
              Message
            </label>

            <textarea
              name="message"

              rows="6"

              placeholder="
                Tell us about your project...
              "

              value={formData.message}

              onChange={handleChange}

              required
            />

          </div>


          {/* BUTTON */}
          <div className="
            form-group
            form-group--full
          ">

            <button
              type="submit"

              className="
                btn
                btn-primary
                contact-form__button
              "

              disabled={loading}
            >

              {loading

                ? "Sending..."

                : "Send Message"}

            </button>

          </div>

        </form>

      </motion.div>

    </section>
  );
}

export default ContactForm;