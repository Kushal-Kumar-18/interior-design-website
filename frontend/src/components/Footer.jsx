import {
  Link,
} from "react-router-dom";

import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";

import "../styles/components/footer.css";


// ============================================================
// COMPONENT
// ============================================================
function Footer() {

  const year =
    new Date().getFullYear();

  return (

    <footer className="footer">

      <div className="container">

        {/* ==================================================
            TOP
        =================================================== */}
        <div className="footer__top">

          {/* BRAND */}
          <div className="footer__brand">

            <Link
              to="/"
              className="footer__logo"
            >

              InteriorX

            </Link>

            <p className="footer__description">

              Crafting timeless luxury
              interiors with elegance,
              premium craftsmanship,
              and sophisticated design.

            </p>


            {/* SOCIALS */}
            <div className="footer__socials">

              <a href="/">

                <FaInstagram />

              </a>

              <a href="/">

                <FaFacebookF />

              </a>

              <a href="/">

                <FaPinterestP />

              </a>

              <a href="/">

                <FaWhatsapp />

              </a>

            </div>

          </div>


          {/* LINKS */}
          <div className="footer__links">

            <h4>
              Quick Links
            </h4>

            <Link to="/">
              Home
            </Link>

            <Link to="/portfolio">
              Portfolio
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>


          {/* SERVICES */}
          <div className="footer__links">

            <h4>
              Services
            </h4>

            <span>
              Luxury Interiors
            </span>

            <span>
              Modular Design
            </span>

            <span>
              Space Planning
            </span>

            <span>
              Turnkey Projects
            </span>

          </div>


          {/* CONTACT */}
          <div className="footer__contact">

            <h4>
              Contact
            </h4>

            <p>
              Bangalore, Karnataka
            </p>

            <a href="tel:+919876543210">
              +91 98765 43210
            </a>

            <a href="mailto:hello@interiorx.com">
              hello@interiorx.com
            </a>

          </div>

        </div>


        {/* ==================================================
            BOTTOM
        =================================================== */}
        <div className="footer__bottom">

          <p>

            © {year} InteriorX.
            All Rights Reserved.

          </p>

          <span>
            Designed With Luxury &
            Precision
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;