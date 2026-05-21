import {
  motion,
} from "framer-motion";

import "../styles/components/process.css";


// ============================================================
// PROCESS DATA
// ============================================================
const processSteps = [

  {
    id: 1,
    number: "01",
    title: "Consultation",
    description:
      "We begin by understanding your vision, lifestyle, preferences, and functional requirements.",
  },

  {
    id: 2,
    number: "02",
    title: "Concept Design",
    description:
      "Our designers craft premium layouts, elegant concepts, and immersive luxury experiences.",
  },

  {
    id: 3,
    number: "03",
    title: "Execution",
    description:
      "We transform concepts into reality with precision craftsmanship and seamless coordination.",
  },

  {
    id: 4,
    number: "04",
    title: "Final Styling",
    description:
      "The finishing touches bring timeless elegance, sophistication, and refined luxury together.",
  },

];


// ============================================================
// COMPONENT
// ============================================================
function Process() {

  return (

    <section className="process section">

      <div className="container">

        {/* ==================================================
            HEADING
        =================================================== */}
        <motion.div
          className="process__heading"

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

            Our Workflow

            <span className="gold-line" />

          </div>

          <h2 className="section-heading__title">

            A Seamless Luxury
            Design Experience

          </h2>

          <p className="section-heading__description">

            From initial consultation
            to final styling,
            every step is curated
            to deliver elegance,
            precision, and sophistication.

          </p>

        </motion.div>


        {/* ==================================================
            GRID
        =================================================== */}
        <div className="process__grid">

          {processSteps.map(
            (
              step,
              index
            ) => (

            <motion.article
              key={step.id}

              className="process-card"

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
                delay:
                  index * 0.1,

                duration: 0.8,

                ease: [0.16, 1, 0.3, 1],
              }}
            >

              {/* NUMBER */}
              <div className="process-card__number">

                {step.number}

              </div>


              {/* GOLD LINE */}
              <div className="gold-line" />


              {/* TITLE */}
              <h3 className="process-card__title">

                {step.title}

              </h3>


              {/* DESCRIPTION */}
              <p className="process-card__description">

                {step.description}

              </p>

            </motion.article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Process;