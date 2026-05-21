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
  projectAPI,
} from "../api/api";

import "../styles/components/portfolio-preview.css";


// ============================================================
// COMPONENT
// ============================================================
function PortfolioPreview() {

  const navigate =
    useNavigate();


  // ==========================================================
  // STATE
  // ==========================================================
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // ==========================================================
  // FETCH PROJECTS
  // ==========================================================
  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          setLoading(true);

          const response =

            await projectAPI.getProjects({

              featured: true,
            });

          const safeProjects =

            response?.data ||

            [];

          setProjects(

            Array.isArray(
              safeProjects
            )
              ? safeProjects
              : []
          );

        } catch (err) {

          console.error(
            "Portfolio Preview Error:",
            err
          );

          setError(
            "Failed to load projects."
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProjects();

  }, []);


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (

      <section className="
        portfolio-preview section
      ">

        <div className="container">

          <div className="
            section-heading
          ">

            <div className="
              section-heading__eyebrow
            ">

              <span className="gold-line" />

              Featured Work

              <span className="gold-line" />

            </div>

            <h2 className="
              section-heading__title
            ">

              Our Portfolio

            </h2>

          </div>

          <div className="
            portfolio-grid
          ">

            {[...Array(6)].map(
              (_, i) => (

              <div
                key={i}

                className="
                  portfolio-skeleton
                  shimmer
                "
              />
            ))}

          </div>

        </div>

      </section>
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <section className="
        portfolio-preview section
      ">

        <div className="container">

          <div className="
            portfolio-error
          ">

            <h3>
              Unable to load portfolio
            </h3>

            <p>
              Please try again later.
            </p>

          </div>

        </div>

      </section>
    );
  }


  // ==========================================================
  // EMPTY
  // ==========================================================
  if (!projects.length) {

    return null;
  }


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <section className="
      portfolio-preview section
    ">

      <div className="container">

        {/* ==================================================
            HEADER
        =================================================== */}
        <motion.div
          className="
            section-heading
          "

          initial={{
            opacity: 0,
            y: 28,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.75,
          }}
        >

          <div className="
            section-heading__eyebrow
          ">

            <span className="gold-line" />

            Featured Work

            <span className="gold-line" />

          </div>

          <h2 className="
            section-heading__title
          ">

            Crafted Luxury Spaces

          </h2>

          <p className="
            section-heading__description
          ">

            Discover timeless interiors
            designed with elegance,
            premium craftsmanship,
            and refined sophistication.

          </p>

        </motion.div>


        {/* ==================================================
            GRID
        =================================================== */}
        <div className="
          portfolio-grid
        ">

          {projects.map(
            (
              project,
              index
            ) => (

            <motion.article
              key={
                project.id ||
                index
              }

              className="
                portfolio-card
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

                duration: 0.75,
              }}
            >

              {/* IMAGE */}
              <div className="
                portfolio-card__image-wrap
              ">

                <img
                  src={
                    project.cover_image ||

                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                  }

                  alt={
                    project.title
                  }

                  className="
                    portfolio-card__image
                  "

                  loading="lazy"
                />

                <div className="
                  portfolio-card__overlay
                " />

              </div>


              {/* CONTENT */}
              <div className="
                portfolio-card__content
              ">

                <div className="
                  portfolio-card__category
                ">

                  {
                    project.category
                  }

                </div>

                <h3 className="
                  portfolio-card__title
                ">

                  {
                    project.title
                  }

                </h3>

                <p className="
                  portfolio-card__description
                ">

                  {
                    project.short_description ||

                    project.description
                  }

                </p>


                {/* FOOTER */}
                <div className="
                  portfolio-card__footer
                ">

                  <button
                    className="
                      portfolio-card__button
                    "

                    onClick={() =>
                      navigate(
                        "/portfolio"
                      )
                    }
                  >

                    View Project

                  </button>

                </div>

              </div>

            </motion.article>
          ))}

        </div>


        {/* ==================================================
            CTA
        =================================================== */}
        <motion.div
          className="
            portfolio-preview__cta
          "

          initial={{
            opacity: 0,
            y: 24,
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
            delay: 0.2,
          }}
        >

          <button
            className="
              btn btn-primary
            "

            onClick={() =>
              navigate("/portfolio")
            }
          >

            Explore Full Portfolio

          </button>

        </motion.div>

      </div>

    </section>
  );
}

export default PortfolioPreview;