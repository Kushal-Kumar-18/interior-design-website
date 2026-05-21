import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

import "../styles/components/hero.css";


// ============================================================
// COMPONENT
// ============================================================
function Hero() {

  return (

    <section className="hero">

      {/* BACKGROUND */}
      <div className="hero__bg">

        <img
          src="
https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop
          "

          alt="Luxury Interior"

          className="hero__bg-image"
        />

        <div className="hero__overlay" />

      </div>


      {/* CONTENT */}
      <div className="container hero__container">

        <motion.div
          className="hero__content"

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
          }}
        >

          {/* LABEL */}
          <div className="hero__eyebrow">

            <span className="gold-line" />

            Luxury Interior Studio

          </div>


          {/* TITLE */}
          <h1 className="hero__title">

            Timeless Interiors
            Crafted For Modern Luxury

          </h1>


          {/* DESCRIPTION */}
          <p className="hero__description">

            We transform ordinary spaces
            into extraordinary experiences
            through elegant design,
            premium craftsmanship,
            and sophisticated aesthetics.

          </p>


          {/* BUTTONS */}
          <div className="hero__actions">

            <Link
              to="/portfolio"
              className="btn btn-primary"
            >

              Explore Portfolio

            </Link>

            <Link
              to="/contact"
              className="btn btn-secondary"
            >

              Book Consultation

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;