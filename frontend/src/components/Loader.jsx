import {
  motion,
} from "framer-motion";

import "../styles/components/loader.css";


// ============================================================
// COMPONENT
// ============================================================
function Loader({

  fullScreen = true,

  text = "Loading Experience",

}) {

  return (

    <div
      className={
        fullScreen
          ? "loader loader--fullscreen"
          : "loader"
      }
    >

      {/* ======================================================
          BACKGROUND GLOW
      ======================================================= */}
      <div className="loader__glow" />


      {/* ======================================================
          CONTENT
      ======================================================= */}
      <div className="loader__content">

        {/* GOLD RING */}
        <motion.div
          className="loader__ring"

          animate={{
            rotate: 360,
          }}

          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "linear",
          }}
        />


        {/* INNER DOT */}
        <motion.div
          className="loader__dot"

          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}

          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        />


        {/* TEXT */}
        <motion.p
          className="loader__text"

          initial={{
            opacity: 0,
            y: 12,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          {text}

        </motion.p>

      </div>

    </div>
  );
}

export default Loader;