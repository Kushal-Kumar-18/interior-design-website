import {
  motion,
} from "framer-motion";

import "../styles/components/page-hero.css";


// ============================================================
// COMPONENT
// ============================================================
function PageHero({

  eyebrow = "Luxury Interiors",

  title = "Page Title",

  description =
    "Elegant spaces crafted with timeless design and refined aesthetics.",

  backgroundImage = "",

  centered = true,

  height = "medium",

}) {

  return (

    <section
      className={`page-hero page-hero--${height}`}
    >

      {/* ======================================================
          BACKGROUND IMAGE
      ======================================================= */}
      {backgroundImage && (

        <div
          className="page-hero__bg"

          style={{
            backgroundImage:
              `url(${backgroundImage})`,
          }}
        />
      )}


      {/* ======================================================
          OVERLAY
      ======================================================= */}
      <div className="page-hero__overlay" />


      {/* ======================================================
          GLOW
      ======================================================= */}
      <div className="page-hero__glow" />


      {/* ======================================================
          CONTENT
      ======================================================= */}
      <div className="container">

        <motion.div
          className={
            centered
              ? "page-hero__content page-hero__content--center"
              : "page-hero__content"
          }

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* EYEBROW */}
          <div className="section-heading__eyebrow">

            <span className="gold-line" />

            {eyebrow}

            <span className="gold-line" />

          </div>


          {/* TITLE */}
          <h1 className="page-hero__title">

            {title}

          </h1>


          {/* DESCRIPTION */}
          <p className="page-hero__description">

            {description}

          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default PageHero;