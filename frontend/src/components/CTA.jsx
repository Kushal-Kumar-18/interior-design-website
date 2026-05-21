import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import "../styles/components/cta.css";


// ============================================================
// COMPONENT
// ============================================================
function CTA({

  title =
    "Ready To Transform Your Space?",

  description =
    "Let’s craft an elegant interior experience tailored to your lifestyle, vision, and aspirations.",

  primaryText =
    "Book Consultation",

  secondaryText =
    "Explore Portfolio",

}) {

  const navigate = useNavigate();


  return (

    <section className="cta-section section">

      {/* ======================================================
          BACKGROUND
      ======================================================= */}
      <div className="cta-section__bg" />

      <div className="cta-section__overlay" />


      {/* ======================================================
          CONTENT
      ======================================================= */}
      <div className="container">

        <motion.div
          className="cta-section__content"

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
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* EYEBROW */}
          <div className="section-heading__eyebrow">

            <span className="gold-line" />

            Let’s Create

            <span className="gold-line" />

          </div>


          {/* TITLE */}
          <h2 className="cta-section__title">

            {title}

          </h2>


          {/* DESCRIPTION */}
          <p className="cta-section__description">

            {description}

          </p>


          {/* ACTIONS */}
          <div className="cta-section__actions">

            <button
              className="btn btn-primary"

              onClick={() =>
                navigate("/contact")
              }
            >

              {primaryText}

            </button>

            <button
              className="btn btn-outline"

              onClick={() =>
                navigate("/portfolio")
              }
            >

              {secondaryText}

            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default CTA;