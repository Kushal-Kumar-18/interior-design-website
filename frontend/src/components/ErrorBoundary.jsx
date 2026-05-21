import React from "react";

import {
  motion,
} from "framer-motion";

import "../styles/components/error-boundary.css";


// ============================================================
// ERROR BOUNDARY
// ============================================================
class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      hasError: false,

      error: null,
    };
  }


  // ==========================================================
  // UPDATE STATE
  // ==========================================================
  static getDerivedStateFromError(
    error
  ) {

    return {

      hasError: true,

      error,
    };
  }


  // ==========================================================
  // LOG ERROR
  // ==========================================================
  componentDidCatch(
    error,
    errorInfo
  ) {

    console.error(
      "FULL ERROR:",
      error
    );

    console.error(
      "ERROR INFO:",
      errorInfo
    );
  }


  // ==========================================================
  // RELOAD
  // ==========================================================
  handleReload = () => {

    window.location.reload();
  };


  // ==========================================================
  // RENDER
  // ==========================================================
  render() {

    if (
      this.state.hasError
    ) {

      return (

        <section className="
          error-boundary
        ">

          {/* ================================================
              GLOW
          ================================================= */}
          <div className="
            error-boundary__glow
          " />


          {/* ================================================
              CONTENT
          ================================================= */}
          <motion.div
            className="
              error-boundary__content
            "

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.7,
            }}
          >

            {/* ERROR CODE */}
            <div className="
              error-boundary__code
            ">

              500

            </div>


            {/* TITLE */}
            <h1 className="
              error-boundary__title
            ">

              Something Went Wrong

            </h1>


            {/* DESCRIPTION */}
            <p className="
              error-boundary__description
            ">

              An unexpected issue
              occurred while rendering
              this page.

              Please refresh and
              try again.

            </p>


            {/* BUTTON */}
            <button
              className="
                btn btn-primary
              "

              onClick={
                this.handleReload
              }
            >

              Reload Website

            </button>

          </motion.div>

        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;