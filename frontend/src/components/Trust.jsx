import {
  motion,
} from "framer-motion";

import "../styles/components/trust.css";


// ============================================================
// TRUST DATA
// ============================================================
const trustItems = [

  {
    id: 1,
    value: "250+",
    label: "Luxury Projects Completed",
  },

  {
    id: 2,
    value: "12+",
    label: "Years Of Design Excellence",
  },

  {
    id: 3,
    value: "98%",
    label: "Client Satisfaction Rate",
  },

  {
    id: 4,
    value: "24/7",
    label: "Dedicated Client Support",
  },

];


// ============================================================
// COMPONENT
// ============================================================
function Trust() {

  return (

    <section className="trust section">

      <div className="container">

        {/* ==================================================
            HEADING
        =================================================== */}
        <motion.div
          className="trust__heading"

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
            duration: 0.7,
          }}
        >

          <div className="section-heading__eyebrow">

            <span className="gold-line" />

            Why Choose Us

            <span className="gold-line" />

          </div>

          <h2 className="section-heading__title">

            Trusted By Luxury Homeowners
            & Premium Brands

          </h2>

          <p className="section-heading__description">

            We combine timeless aesthetics,
            premium craftsmanship,
            and intelligent spatial design
            to create exceptional luxury
            interior experiences.

          </p>

        </motion.div>


        {/* ==================================================
            GRID
        =================================================== */}
        <div className="trust__grid">

          {trustItems.map(
            (
              item,
              index
            ) => (

            <motion.article
              key={item.id}

              className="trust-card"

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

                duration: 0.75,

                ease: [0.16, 1, 0.3, 1],
              }}
            >

              {/* VALUE */}
              <div className="trust-card__value">

                {item.value}

              </div>


              {/* DIVIDER */}
              <div className="gold-line" />


              {/* LABEL */}
              <p className="trust-card__label">

                {item.label}

              </p>

            </motion.article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Trust;