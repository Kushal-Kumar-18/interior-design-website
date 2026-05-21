import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

import "../styles/pages/notfound.css";


// ============================================================
// COMPONENT
// ============================================================
function NotFound() {

  return (

    <main className="notfound-page">

      {/* ======================================================
          GLOW
      ======================================================= */}
      <div className="notfound-page__glow" />


      {/* ======================================================
          CONTENT
      ======================================================= */}
      <motion.div
        className="notfound-page__content"

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

        {/* ERROR CODE */}
        <div className="notfound-page__code">

          404

        </div>


        {/* TITLE */}
        <h1 className="notfound-page__title">

          Page Not Found

        </h1>


        {/* DESCRIPTION */}
        <p className="notfound-page__description">

          The page you’re looking for may
          have been moved, removed, or
          does not exist.

        </p>


        {/* ACTIONS */}
        <div className="notfound-page__actions">

          <Link
            to="/"
            className="btn btn-primary"
          >

            Back To Home

          </Link>

          <Link
            to="/portfolio"
            className="btn btn-outline"
          >

            Explore Portfolio

          </Link>

        </div>

      </motion.div>

    </main>
  );
}

export default NotFound;