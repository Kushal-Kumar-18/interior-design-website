import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {

  FiSave,

  FiGlobe,

  FiInstagram,

  FiPhone,

  FiMail,

} from "react-icons/fi";

import axios from "axios";

import Loader from "../../components/Loader";

import "../styles/settings.css";


// ============================================================
// API
// ============================================================
const API_URL =
  "http://127.0.0.1:5000/api/settings/";


// ============================================================
// COMPONENT
// ============================================================
function Settings() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [settings,
    setSettings] =
    useState({

      website_name: "",

      tagline: "",

      phone: "",

      email: "",

      address: "",

      instagram: "",

      facebook: "",

      linkedin: "",

      meta_title: "",

      meta_description: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [success,
    setSuccess] =
    useState(false);


  // ==========================================================
  // FETCH SETTINGS
  // ==========================================================
  useEffect(() => {

    const fetchSettings =
      async () => {

        try {

          setLoading(true);

          const response =
            await axios.get(
              API_URL
            );

          setSettings(

            response.data.data
          );

        } catch (err) {

          console.error(err);

          setError(
            "Failed to load settings."
          );

        } finally {

          setLoading(false);
        }
      };

    fetchSettings();

  }, []);


  // ==========================================================
  // CHANGE
  // ==========================================================
  const handleChange =
    (e) => {

      setSettings({

        ...settings,

        [e.target.name]:
          e.target.value,
      });
    };


  // ==========================================================
  // SAVE
  // ==========================================================
  const handleSave =
    async (e) => {

      e.preventDefault();

      try {

        setSaving(true);

        setSuccess(false);

        await axios.put(

          API_URL,

          settings
        );

        setSuccess(true);

      } catch (err) {

        console.error(err);

        alert(
          "Failed to save settings."
        );

      } finally {

        setSaving(false);
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader
        text="Loading Settings"
      />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="
        settings-error
      ">

        <h2>
          {error}
        </h2>

      </div>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="
      admin-settings
    ">

      {/* ====================================================
          HEADER
      ===================================================== */}
      <div className="
        settings-header
      ">

        <div>

          <h1>
            Website Settings
          </h1>

          <p>
            Manage branding,
            contact details,
            SEO and social links.
          </p>

        </div>

      </div>


      {/* ====================================================
          FORM
      ===================================================== */}
      <motion.form
        className="
          settings-form
        "

        onSubmit={
          handleSave
        }

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        {/* ==================================================
            GENERAL
        =================================================== */}
        <div className="
          settings-card
        ">

          <div className="
            settings-card__header
          ">

            <FiGlobe />

            <h3>
              General Information
            </h3>

          </div>


          <div className="
            settings-grid
          ">

            <div className="
              settings-field
            ">

              <label>
                Website Name
              </label>

              <input
                type="text"

                name="
                  website_name
                "

                value={
                  settings.website_name
                }

                onChange={
                  handleChange
                }
              />

            </div>


            <div className="
              settings-field
            ">

              <label>
                Tagline
              </label>

              <input
                type="text"

                name="tagline"

                value={
                  settings.tagline
                }

                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            CONTACT
        =================================================== */}
        <div className="
          settings-card
        ">

          <div className="
            settings-card__header
          ">

            <FiPhone />

            <h3>
              Contact Information
            </h3>

          </div>


          <div className="
            settings-grid
          ">

            <div className="
              settings-field
            ">

              <label>
                Phone Number
              </label>

              <input
                type="text"

                name="phone"

                value={
                  settings.phone
                }

                onChange={
                  handleChange
                }
              />

            </div>


            <div className="
              settings-field
            ">

              <label>
                Email Address
              </label>

              <input
                type="email"

                name="email"

                value={
                  settings.email
                }

                onChange={
                  handleChange
                }
              />

            </div>


            <div className="
              settings-field
              full-width
            ">

              <label>
                Address
              </label>

              <textarea

                name="address"

                rows="3"

                value={
                  settings.address
                }

                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            SOCIALS
        =================================================== */}
        <div className="
          settings-card
        ">

          <div className="
            settings-card__header
          ">

            <FiInstagram />

            <h3>
              Social Media
            </h3>

          </div>


          <div className="
            settings-grid
          ">

            <div className="
              settings-field
            ">

              <label>
                Instagram URL
              </label>

              <input
                type="text"

                name="
                  instagram
                "

                value={
                  settings.instagram
                }

                onChange={
                  handleChange
                }
              />

            </div>


            <div className="
              settings-field
            ">

              <label>
                Facebook URL
              </label>

              <input
                type="text"

                name="
                  facebook
                "

                value={
                  settings.facebook
                }

                onChange={
                  handleChange
                }
              />

            </div>


            <div className="
              settings-field
            ">

              <label>
                LinkedIn URL
              </label>

              <input
                type="text"

                name="
                  linkedin
                "

                value={
                  settings.linkedin
                }

                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            SEO
        =================================================== */}
        <div className="
          settings-card
        ">

          <div className="
            settings-card__header
          ">

            <FiMail />

            <h3>
              SEO Settings
            </h3>

          </div>


          <div className="
            settings-grid
          ">

            <div className="
              settings-field
              full-width
            ">

              <label>
                Meta Title
              </label>

              <input
                type="text"

                name="
                  meta_title
                "

                value={
                  settings.meta_title
                }

                onChange={
                  handleChange
                }
              />

            </div>


            <div className="
              settings-field
              full-width
            ">

              <label>
                Meta Description
              </label>

              <textarea

                name="
                  meta_description
                "

                rows="4"

                value={
                  settings.meta_description
                }

                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            SUCCESS
        =================================================== */}
        {success && (

          <div className="
            settings-success
          ">

            Settings updated
            successfully.

          </div>
        )}


        {/* ==================================================
            BUTTON
        =================================================== */}
        <button
          type="submit"

          className="
            settings-save-btn
          "

          disabled={
            saving
          }
        >

          <FiSave />

          {saving

            ? "Saving..."

            : "Save Settings"}

        </button>

      </motion.form>

    </div>
  );
}

export default Settings;