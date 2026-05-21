import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  serviceAPI,
} from "../api/api";

import Loader from "../components/Loader";
import CTA from "../components/CTA";
import PageHero from "../components/PageHero";

import "../styles/pages/services.css";


// ============================================================
// FALLBACK PROCESS STEPS
// ============================================================
const fallbackProcessSteps = [

  {
    id: 1,

    step_number: 1,

    title:
      "Consultation",

    description:
      "Understanding your vision, preferences, and luxury lifestyle requirements.",
  },

  {
    id: 2,

    step_number: 2,

    title:
      "Concept Design",

    description:
      "Crafting elegant concepts and premium spatial experiences.",
  },

  {
    id: 3,

    step_number: 3,

    title:
      "Execution",

    description:
      "Precise execution with luxury craftsmanship and refined detailing.",
  },

  {
    id: 4,

    step_number: 4,

    title:
      "Final Styling",

    description:
      "Curating sophisticated finishing touches for timeless elegance.",
  },
];


// ============================================================
// COMPONENT
// ============================================================
function Services() {

  const navigate =
    useNavigate();


  // ==========================================================
  // STATE
  // ==========================================================
  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // ==========================================================
  // FETCH SERVICES
  // ==========================================================
  useEffect(() => {

    const fetchServices =
      async () => {

        try {

          setLoading(true);

          const response =
            await serviceAPI.getServices();

          const safeServices =

            response?.data ||

            [];

          setServices(

            Array.isArray(
              safeServices
            )
              ? safeServices
              : []
          );

        } catch (err) {

          console.error(
            "Services API Error:",
            err
          );

          setError(
            "Failed to load services."
          );

        } finally {

          setLoading(false);
        }
      };

    fetchServices();

  }, []);


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader text="Loading Services" />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <section className="services-error">

        <div className="container">

          <h2>
            Unable to load services
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

    <main className="services-page">

      {/* ====================================================
          HERO
      ===================================================== */}
      <PageHero
        eyebrow="What We Offer"

        title="Luxury Interior Services"

        description="
          Tailored interior design solutions
          crafted with precision, elegance,
          and timeless sophistication.
        "

        height="medium"

        backgroundImage="
          https://images.unsplash.com/photo-1616594039964-3b4f4c8c3d0e?q=80&w=1800&auto=format&fit=crop
        "
      />


      {/* ====================================================
          SERVICES GRID
      ===================================================== */}
      <section className="
        services-grid-section section
      ">

        <div className="container">

          {/* ==================================================
              HEADING
          =================================================== */}
          <motion.div
            className="section-heading"

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
              section-heading__eyebrow
            ">

              <span className="gold-line" />

              Premium Solutions

              <span className="gold-line" />

            </div>

            <h2 className="
              section-heading__title
            ">

              Crafted For Every Space

            </h2>

            <p className="
              section-heading__description
            ">

              From bespoke living spaces
              to luxury commercial interiors,
              we create environments that
              elevate everyday living.

            </p>

          </motion.div>


          {/* ==================================================
              EMPTY STATE
          =================================================== */}
          {!services.length && (

            <div className="
              services-empty
            ">

              <h3>
                Services Coming Soon
              </h3>

              <p>
                Luxury service offerings
                are currently being updated.
              </p>

            </div>
          )}


          {/* ==================================================
              GRID
          =================================================== */}
          <div className="
            services-grid
          ">

            {services.map(
              (
                service,
                index
              ) => (

              <motion.article
                key={
                  service.id ||
                  index
                }

                className="
                  service-card
                "

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay:
                    index * 0.08,

                  duration: 0.7,
                }}
              >

                {/* ICON */}
                <div className="
                  service-card__icon
                ">

                  {
                    service.icon ||
                    "✦"
                  }

                </div>


                {/* FEATURED */}
                {service.featured && (

                  <div className="
                    service-card__tag
                  ">

                    Featured

                  </div>
                )}


                {/* TITLE */}
                <h3 className="
                  service-card__title
                ">

                  {
                    service.title
                  }

                </h3>


                {/* DESCRIPTION */}
                <p className="
                  service-card__description
                ">

                  {
                    service.short_description ||

                    service.description
                  }

                </p>


                {/* BUTTON */}
                <button
                  className="
                    service-card__button
                  "

                  onClick={() =>
                    navigate(
                      "/contact"
                    )
                  }
                >

                  Enquire Now

                </button>

              </motion.article>
            ))}

          </div>

        </div>

      </section>


      {/* ====================================================
          PROCESS SECTION
      ===================================================== */}
      <section className="
        services-process section
      ">

        <div className="container">

          {/* ==================================================
              HEADING
          =================================================== */}
          <motion.div
            className="section-heading"

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
              section-heading__eyebrow
            ">

              <span className="gold-line" />

              Our Workflow

              <span className="gold-line" />

            </div>

            <h2 className="
              section-heading__title
            ">

              How We Work

            </h2>

          </motion.div>


          {/* ==================================================
              PROCESS GRID
          =================================================== */}
          <div className="
            services-process__grid
          ">

            {fallbackProcessSteps.map(
              (
                step,
                index
              ) => (

              <motion.div
                key={
                  step.id
                }

                className="
                  services-process__card
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
                  delay:
                    index * 0.08,
                }}
              >

                {/* NUMBER */}
                <div className="
                  services-process__number
                ">

                  {String(
                    step.step_number
                  ).padStart(2, "0")}

                </div>


                {/* LINE */}
                <div className="gold-line" />


                {/* TITLE */}
                <h4>

                  {step.title}

                </h4>


                {/* DESCRIPTION */}
                <p>

                  {step.description}

                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>


      {/* ====================================================
          CTA
      ===================================================== */}
      <CTA />

    </main>
  );
}

export default Services;