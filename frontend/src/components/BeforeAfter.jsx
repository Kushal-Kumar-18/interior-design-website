import {
  useRef,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import "../styles/components/before-after.css";


// ============================================================
// COMPONENT
// ============================================================
function BeforeAfter() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [position,
    setPosition] =
    useState(50);

  const containerRef =
    useRef(null);


  // ==========================================================
  // UPDATE POSITION
  // ==========================================================
  const updateSlider = (
    clientX
  ) => {

    if (
      !containerRef.current
    ) {
      return;
    }

    const rect =
      containerRef.current.getBoundingClientRect();

    const x =
      clientX - rect.left;

    const percentage =
      (x / rect.width) * 100;

    setPosition(

      Math.min(
        Math.max(
          percentage,
          0
        ),
        100
      )
    );
  };


  // ==========================================================
  // MOUSE MOVE
  // ==========================================================
  const handleMouseMove = (
    e
  ) => {

    updateSlider(
      e.clientX
    );
  };


  // ==========================================================
  // TOUCH MOVE
  // ==========================================================
  const handleTouchMove = (
    e
  ) => {

    updateSlider(
      e.touches[0].clientX
    );
  };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <section className="before-after section">

      <div className="container">

        {/* ==================================================
            HEADING
        =================================================== */}
        <motion.div
          className="before-after__heading"

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
          }}
        >

          <div className="section-heading__eyebrow">

            <span className="gold-line" />

            Before & After

            <span className="gold-line" />

          </div>

          <h2 className="section-heading__title">

            Remarkable Interior
            Transformations

          </h2>

          <p className="section-heading__description">

            Experience how we transform
            ordinary spaces into timeless
            luxury interiors through
            elegant design and precision
            craftsmanship.

          </p>

        </motion.div>


        {/* ==================================================
            COMPARISON WRAPPER
        =================================================== */}
        <motion.div
          ref={containerRef}

          className="
            before-after__wrapper
          "

          initial={{
            opacity: 0,
            y: 50,
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
          }}

          onMouseMove={
            handleMouseMove
          }

          onTouchMove={
            handleTouchMove
          }
        >

          {/* ==================================================
              IMAGES
          =================================================== */}
          <div className="before-after__images">

            {/* BEFORE IMAGE */}
            <img
              src="
https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop
              "

              alt="Before Interior"

              className="
                before-after__image
                before-after__before
              "
            />


            {/* AFTER WRAPPER */}
            <div
              className="
                before-after__after-wrapper
              "

              style={{
                width:
                  `${position}%`,
              }}
            >

              {/* AFTER IMAGE */}
              <img
                src="
https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop
                "

                alt="After Interior"

                className="
                  before-after__image
                  before-after__after
                "
              />

            </div>


            {/* BEFORE LABEL */}
            <div
              className="
                before-after__label
                before-after__label--before
              "
            >

              Before

            </div>


            {/* AFTER LABEL */}
            <div
              className="
                before-after__label
                before-after__label--after
              "
            >

              After

            </div>


            {/* SLIDER */}
            <div
              className="
                before-after__slider
              "

              style={{
                left:
                  `${position}%`,
              }}
            >

              {/* HANDLE */}
              <div
                className="
                  before-after__handle
                "
              >

                ↔

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default BeforeAfter;