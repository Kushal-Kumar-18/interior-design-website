import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  projectAPI,
  testimonialAPI,
} from "../api/api";

import Hero from "../components/Hero";
import Trust from "../components/Trust";
import Process from "../components/Process";
import BeforeAfter from "../components/BeforeAfter";
import CTA from "../components/CTA";
import Loader from "../components/Loader";

import "../styles/pages/home.css";


// ============================================================
// PORTFOLIO PREVIEW
// ============================================================
function PortfolioPreview({
  projects = [],
}) {

  const previewProjects =
    Array.isArray(projects)
      ? projects.slice(0, 6)
      : [];


  if (!previewProjects.length) {

    return null;
  }


  return (

    <section className="home-portfolio section">

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

          transition={{
            duration: 0.7,
          }}
        >

          <div className="section-heading__eyebrow">

            <span className="gold-line" />

            Featured Work

            <span className="gold-line" />

          </div>

          <h2 className="section-heading__title">

            Luxury Interior Showcase

          </h2>

          <p className="section-heading__description">

            Explore our signature
            transformations crafted with
            elegance, timeless aesthetics,
            and premium craftsmanship.

          </p>

        </motion.div>


        {/* ==================================================
            GRID
        =================================================== */}
        <div className="home-portfolio__grid">

          {previewProjects.map(
            (
              project,
              index
            ) => (

            <motion.article
              key={
                project.id ||
                index
              }

              className="home-portfolio__card"

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

              {/* IMAGE */}
              <div className="home-portfolio__image-wrap">

                <img
                  src={
                    project.cover_image ||

                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                  }

                  alt={
                    project.title ||
                    "Luxury Interior"
                  }

                  className="home-portfolio__image"
                />

              </div>


              {/* CONTENT */}
              <div className="home-portfolio__content">

                <span className="home-portfolio__category">

                  {
                    project.category ||
                    "Interior Design"
                  }

                </span>

                <h3>

                  {
                    project.title ||
                    "Luxury Space"
                  }

                </h3>

                <p>

                  {
                    project.short_description ||

                    project.description ||

                    "Elegant luxury interior crafted with timeless sophistication."
                  }

                </p>

              </div>

            </motion.article>
          ))}

        </div>

      </div>

    </section>
  );
}


// ============================================================
// TESTIMONIALS
// ============================================================
function Testimonials({
  testimonials = [],
}) {

  if (
    !Array.isArray(
      testimonials
    ) ||

    !testimonials.length
  ) {

    return null;
  }


  return (

    <section className="home-testimonials section">

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

          <div className="section-heading__eyebrow">

            <span className="gold-line" />

            Client Experiences

            <span className="gold-line" />

          </div>

          <h2 className="section-heading__title">

            What Our Clients Say

          </h2>

        </motion.div>


        {/* ==================================================
            GRID
        =================================================== */}
        <div className="home-testimonials__grid">

          {testimonials.map(
            (
              item,
              index
            ) => (

            <motion.article
              key={
                item.id ||
                index
              }

              className="testimonial-card"

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
              }}
            >

              <div className="testimonial-card__quote">

                “

              </div>

              <p className="testimonial-card__review">

                {
                  item.review
                }

              </p>

              <div className="testimonial-card__footer">

                <h4>

                  {
                    item.client_name ||
                    "Client"
                  }

                </h4>

                <span>

                  {
                    item.designation ||
                    "Interior Client"
                  }

                </span>

              </div>

            </motion.article>
          ))}

        </div>

      </div>

    </section>
  );
}


// ============================================================
// HOME PAGE
// ============================================================
function Home() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [projects, setProjects] =
    useState([]);

  const [
    testimonials,
    setTestimonials,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  // ==========================================================
  // FETCH HOME DATA
  // ==========================================================
  useEffect(() => {

    const fetchHomeData =
      async () => {

        try {

          setLoading(true);

          // ================================================
          // FETCH IN PARALLEL
          // ================================================
          const [

            projectsRes,

            testimonialsRes,

          ] = await Promise.all([

            projectAPI.getProjects(),

            testimonialAPI.getTestimonials(),

          ]);


          // ================================================
          // SAFE DATA
          // ================================================
          const safeProjects =

            projectsRes?.data ||

            [];

          const safeTestimonials =

            testimonialsRes?.data ||

            [];


          // ================================================
          // SET STATE
          // ================================================
          setProjects(
            safeProjects
          );

          setTestimonials(
            safeTestimonials
          );

        } catch (err) {

          console.error(
            "Home API Error:",
            err
          );

          setError(
            "Failed to load content."
          );

        } finally {

          setLoading(false);
        }
      };

    fetchHomeData();

  }, []);


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader text="Loading Experience" />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="page-error">

        <div className="container">

          <h2>
            Unable to load homepage
          </h2>

          <p>
            Please check backend connection.
          </p>

        </div>

      </div>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <main className="home-page">

      {/* HERO */}
      <Hero />

      {/* TRUST */}
      <Trust />

      {/* PROCESS */}
      <Process />

      {/* PORTFOLIO */}
      <PortfolioPreview
        projects={projects}
      />

      {/* BEFORE AFTER */}
      <BeforeAfter />

      {/* TESTIMONIALS */}
      <Testimonials
        testimonials={
          testimonials
        }
      />

      {/* CTA */}
      <CTA />

    </main>
  );
}

export default Home;