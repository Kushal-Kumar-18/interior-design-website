import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  projectAPI,
} from "../api/api";

import Loader from "../components/Loader";
import CTA from "../components/CTA";
import PageHero from "../components/PageHero";

import "../styles/pages/portfolio.css";


// ============================================================
// COMPONENT
// ============================================================
function Portfolio() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");

  const [
    selectedProject,
    setSelectedProject,
  ] = useState(null);


  // ==========================================================
  // FETCH PROJECTS
  // ==========================================================
  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          setLoading(true);

          const response =
            await projectAPI.getProjects();

          const projectsData =

            response?.data ||

            [];

          setProjects(
            Array.isArray(
              projectsData
            )
              ? projectsData
              : []
          );

        } catch (err) {

          console.error(
            "Portfolio API Error:",
            err
          );

          setError(
            "Failed to load portfolio."
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProjects();

  }, []);


  // ==========================================================
  // CATEGORIES
  // ==========================================================
  const categories =
    useMemo(() => {

      if (
        !Array.isArray(projects)
      ) {

        return ["All"];
      }

      return [

        "All",

        ...new Set(

          projects
            .filter(
              (project) =>
                project?.category
            )

            .map(
              (project) =>
                project.category
            )
        ),

      ];

    }, [projects]);


  // ==========================================================
  // FILTERED PROJECTS
  // ==========================================================
  const filteredProjects =

    activeCategory === "All"

      ? projects

      : projects.filter(
          (project) =>

            project.category ===
            activeCategory
        );


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader text="Loading Portfolio" />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <section className="portfolio-error">

        <div className="container">

          <h2>
            Unable to load portfolio
          </h2>

          <p>
            {error}
          </p>

        </div>

      </section>
    );
  }


  // ==========================================================
  // EMPTY
  // ==========================================================
  if (!projects.length) {

    return (

      <main className="portfolio-page">

        <PageHero
          eyebrow="Our Creations"
          title="Luxury Portfolio"
          description="
            Explore our curated collection
            of timeless interior transformations
            crafted with elegance and precision.
          "
          height="medium"
        />

        <section className="portfolio-empty section">

          <div className="container">

            <motion.div
              className="
                portfolio-empty__content
              "

              initial={{
                opacity: 0,
                y: 30,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}
            >

              <h2>
                Portfolio Coming Soon
              </h2>

              <p>
                Luxury showcase projects
                are being prepared.
              </p>

            </motion.div>

          </div>

        </section>

        <CTA />

      </main>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <main className="portfolio-page">

      {/* ====================================================
          HERO
      ===================================================== */}
      <PageHero
        eyebrow="Our Creations"

        title="Luxury Portfolio"

        description="
          Explore our curated collection
          of timeless interior transformations
          crafted with elegance and precision.
        "

        height="medium"

        backgroundImage="
          https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop
        "
      />


      {/* ====================================================
          FILTERS
      ===================================================== */}
      <section className="portfolio-filters">

        <div className="container">

          <div className="
            portfolio-filters__wrapper
          ">

            {categories.map(
              (category) => (

              <button
                key={category}

                className={

                  activeCategory === category

                    ? "portfolio-filter portfolio-filter--active"

                    : "portfolio-filter"
                }

                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
              >

                {category}

              </button>
            ))}

          </div>

        </div>

      </section>


      {/* ====================================================
          GRID
      ===================================================== */}
      <section className="
        portfolio-grid-section section
      ">

        <div className="container">

          <div className="
            portfolio-grid
          ">

            <AnimatePresence>

              {filteredProjects.map(
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
                    portfolio-item
                  "

                  layout

                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  exit={{
                    opacity: 0,
                    scale: 0.92,
                  }}

                  transition={{
                    delay:
                      index * 0.05,

                    duration: 0.7,
                  }}
                >

                  {/* IMAGE */}
                  <div className="
                    portfolio-item__image-wrap
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
                        portfolio-item__image
                      "
                    />

                    <div className="
                      portfolio-item__overlay
                    " />

                  </div>


                  {/* CONTENT */}
                  <div className="
                    portfolio-item__content
                  ">

                    <div className="
                      portfolio-item__category
                    ">

                      {
                        project.category
                      }

                    </div>

                    <h3 className="
                      portfolio-item__title
                    ">

                      {
                        project.title
                      }

                    </h3>

                    <p className="
                      portfolio-item__description
                    ">

                      {
                        project.short_description ||

                        project.description
                      }

                    </p>

                    <button
                      className="
                        portfolio-item__button
                      "

                      onClick={() =>
                        setSelectedProject(
                          project
                        )
                      }
                    >

                      View Details

                    </button>

                  </div>

                </motion.article>
              ))}

            </AnimatePresence>

          </div>

        </div>

      </section>


      {/* ====================================================
          MODAL
      ===================================================== */}
      <AnimatePresence>

        {selectedProject && (

          <motion.div
            className="
              portfolio-modal
            "

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >

            {/* BACKDROP */}
            <div
              className="
                portfolio-modal__backdrop
              "

              onClick={() =>
                setSelectedProject(
                  null
                )
              }
            />


            {/* CONTENT */}
            <motion.div
              className="
                portfolio-modal__content
              "

              initial={{
                opacity: 0,
                scale: 0.92,
                y: 30,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.92,
              }}
            >

              {/* CLOSE */}
              <button
                className="
                  portfolio-modal__close
                "

                onClick={() =>
                  setSelectedProject(
                    null
                  )
                }
              >

                ×

              </button>


              {/* IMAGE */}
              <div className="
                portfolio-modal__image-wrap
              ">

                <img
                  src={
                    selectedProject.cover_image
                  }

                  alt={
                    selectedProject.title
                  }

                  className="
                    portfolio-modal__image
                  "
                />

              </div>


              {/* DETAILS */}
              <div className="
                portfolio-modal__details
              ">

                <div className="
                  portfolio-modal__category
                ">

                  {
                    selectedProject.category
                  }

                </div>

                <h2>

                  {
                    selectedProject.title
                  }

                </h2>

                <p>

                  {
                    selectedProject.description
                  }

                </p>

                <div className="
                  portfolio-modal__meta
                ">

                  <span>

                    📍 {
                      selectedProject.location ||
                      "Location unavailable"
                    }

                  </span>

                  <span>

                    🏠 {
                      selectedProject.area_size ||
                      "Area unavailable"
                    }

                  </span>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>


      {/* ====================================================
          CTA
      ===================================================== */}
      <CTA />

    </main>
  );
}

export default Portfolio;