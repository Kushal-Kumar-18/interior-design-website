import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import Loader from "../components/Loader";
import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import BookingForm from "../components/BookingForm";

import "../styles/pages/contact.css";


// ============================================================
// DEFAULT SETTINGS
// ============================================================
const defaultSettings = {

  phone:
    "+91 98765 43210",

  email:
    "hello@interiorx.com",

  address:
    "Bangalore, Karnataka, India",

  google_map_url:
    "https://maps.google.com/maps?q=Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed",
};


// ============================================================
// COMPONENT
// ============================================================
function Contact() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // ==========================================================
  // LOAD SETTINGS
  // ==========================================================
  useEffect(() => {

    const initializePage =
      async () => {

        try {

          setLoading(true);

          // ================================================
          // FUTURE CMS SETTINGS API CAN BE ADDED HERE
          // ================================================
          setSettings(
            defaultSettings
          );

        } catch (err) {

          console.error(
            "Contact Page Error:",
            err
          );

          setError(
            "Failed to load contact page."
          );

        } finally {

          setLoading(false);
        }
      };

    initializePage();

  }, []);


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader text="Loading Contact" />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <section className="contact-error">

        <div className="container">

          <h2>
            Unable to load contact page
          </h2>

          <p>
            {error}
          </p>

        </div>

      </section>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <main className="contact-page">

      {/* ====================================================
          HERO
      ===================================================== */}
      <PageHero
        eyebrow="Contact Us"

        title="Let’s Create Something Exceptional"

        description="
          Connect with our design team
          to discuss your dream interiors,
          luxury transformations,
          and personalized experiences.
        "

        height="medium"

        backgroundImage="
          https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop
        "
      />


      {/* ====================================================
          INFO CARDS
      ===================================================== */}
      <section className="
        contact-info-section section-sm
      ">

        <div className="container">

          <div className="
            contact-info-grid
          ">

            {/* PHONE */}
            <motion.div
              className="
                contact-info-card
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

              <div className="
                contact-info-card__icon
              ">

                ☎

              </div>

              <h3>
                Call Us
              </h3>

              <a
                href={`tel:${settings.phone}`}
              >

                {
                  settings.phone
                }

              </a>

            </motion.div>


            {/* EMAIL */}
            <motion.div
              className="
                contact-info-card
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

              transition={{
                delay: 0.1,
              }}
            >

              <div className="
                contact-info-card__icon
              ">

                ✉

              </div>

              <h3>
                Email Us
              </h3>

              <a
                href={`mailto:${settings.email}`}
              >

                {
                  settings.email
                }

              </a>

            </motion.div>


            {/* ADDRESS */}
            <motion.div
              className="
                contact-info-card
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

              transition={{
                delay: 0.2,
              }}
            >

              <div className="
                contact-info-card__icon
              ">

                ⌂

              </div>

              <h3>
                Visit Studio
              </h3>

              <p>

                {
                  settings.address
                }

              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ====================================================
          FORMS
      ===================================================== */}
      <section className="
        contact-forms section
      ">

        <div className="container">

          <div className="
            contact-forms__grid
          ">

            {/* CONTACT FORM */}
            <motion.div

              initial={{
                opacity: 0,
                x: -40,
              }}

              whileInView={{
                opacity: 1,
                x: 0,
              }}

              viewport={{
                once: true,
              }}
            >

              <ContactForm />

            </motion.div>


            {/* BOOKING FORM */}
            <motion.div

              initial={{
                opacity: 0,
                x: 40,
              }}

              whileInView={{
                opacity: 1,
                x: 0,
              }}

              viewport={{
                once: true,
              }}
            >

              <BookingForm />

            </motion.div>

          </div>

        </div>

      </section>


      {/* ====================================================
          MAP
      ===================================================== */}
      <section className="
        contact-map
      ">

        <iframe
          title="Studio Location"

          src={
            settings.google_map_url
          }

          loading="lazy"

          allowFullScreen
        />

      </section>

    </main>
  );
}

export default Contact;