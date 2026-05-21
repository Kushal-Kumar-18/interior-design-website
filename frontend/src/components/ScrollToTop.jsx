import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import "../styles/components/scroll-to-top.css";


// ============================================================
// COMPONENT
// ============================================================
function ScrollToTop() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [visible, setVisible] =
    useState(false);


  // ==========================================================
  // SCROLL LISTENER
  // ==========================================================
  useEffect(() => {

    const handleScroll = () => {

      setVisible(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);


  // ==========================================================
  // SCROLL ACTION
  // ==========================================================
  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });
  };


  return (

    <AnimatePresence>

      {visible && (

        <motion.button
          className="scroll-top"

          onClick={scrollToTop}

          initial={{
            opacity: 0,
            y: 24,
            scale: 0.9,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            y: 20,
            scale: 0.9,
          }}

          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}

          whileHover={{
            y: -4,
            scale: 1.04,
          }}

          whileTap={{
            scale: 0.96,
          }}

          aria-label="Scroll to top"
        >

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >

            <path
              d="M12 19V5"

              stroke="currentColor"

              strokeWidth="1.8"

              strokeLinecap="round"
            />

            <path
              d="M5 12L12 5L19 12"

              stroke="currentColor"

              strokeWidth="1.8"

              strokeLinecap="round"

              strokeLinejoin="round"
            />

          </svg>

        </motion.button>
      )}

    </AnimatePresence>
  );
}

export default ScrollToTop;