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

  FiPlus,

  FiSearch,

  FiEdit2,

  FiTrash2,

  FiLayers,

  FiX,

} from "react-icons/fi";

import {
  serviceAPI,
} from "../../api/api";

import Loader from "../../components/Loader";

import "../styles/servicesAdmin.css";


// ============================================================
// INITIAL FORM
// ============================================================
const INITIAL_FORM = {

  title: "",

  short_description: "",

  description: "",

  icon: "✦",

  cover_image: "",

  featured: false,
};


// ============================================================
// COMPONENT
// ============================================================
function ServicesAdmin() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [modalOpen,
    setModalOpen] =
    useState(false);

  const [editingService,
    setEditingService] =
    useState(null);

  const [formData,
    setFormData] =
    useState(INITIAL_FORM);

  const [submitting,
    setSubmitting] =
    useState(false);


  // ==========================================================
  // FETCH SERVICES
  // ==========================================================
  const fetchServices =
    async () => {

      try {

        setLoading(true);

        const response =

          await serviceAPI.getServices();

        const safeServices =

          response?.data ||

          [];

        setServices(

          Array.isArray(
            safeServices
          )
            ? safeServices
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load services."
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchServices();

  }, []);


  // ==========================================================
  // FILTERED
  // ==========================================================
  const filteredServices =
    useMemo(() => {

      return services.filter(
        (service) =>

          service.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [services, search]);


  // ==========================================================
  // OPEN CREATE
  // ==========================================================
  const openCreateModal =
    () => {

      setEditingService(
        null
      );

      setFormData(
        INITIAL_FORM
      );

      setModalOpen(true);
    };


  // ==========================================================
  // OPEN EDIT
  // ==========================================================
  const openEditModal =
    (service) => {

      setEditingService(
        service
      );

      setFormData({

        title:
          service.title || "",

        short_description:
          service.short_description || "",

        description:
          service.description || "",

        icon:
          service.icon || "✦",

        cover_image:
          service.cover_image || "",

        featured:
          service.featured || false,
      });

      setModalOpen(true);
    };


  // ==========================================================
  // CLOSE MODAL
  // ==========================================================
  const closeModal =
    () => {

      setModalOpen(false);

      setEditingService(
        null
      );

      setFormData(
        INITIAL_FORM
      );
    };


  // ==========================================================
  // CHANGE
  // ==========================================================
  const handleChange =
    (e) => {

      const {

        name,

        value,

        type,

        checked,

      } = e.target;

      setFormData({

        ...formData,

        [name]:

          type === "checkbox"

            ? checked

            : value,
      });
    };


  // ==========================================================
  // SUBMIT
  // ==========================================================
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSubmitting(true);

        if (
          editingService
        ) {

          await serviceAPI.updateService(

            editingService.id,

            formData
          );

        } else {

          await serviceAPI.createService(
            formData
          );
        }

        await fetchServices();

        closeModal();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to save service."
        );

      } finally {

        setSubmitting(false);
      }
    };


  // ==========================================================
  // DELETE
  // ==========================================================
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this service?"
        );

      if (!confirmDelete) {

        return;
      }

      try {

        await serviceAPI.deleteService(
          id
        );

        await fetchServices();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to delete service."
        );
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader
        text="Loading Services"
      />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="
        admin-services-error
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
      admin-services
    ">

      {/* ====================================================
          HEADER
      ===================================================== */}
      <div className="
        services-admin-header
      ">

        <div>

          <h1>
            Services Management
          </h1>

          <p>
            Manage luxury services
            and offerings.
          </p>

        </div>


        <button
          className="
            services-admin-add-btn
          "

          onClick={
            openCreateModal
          }
        >

          <FiPlus />

          Add Service

        </button>

      </div>


      {/* ====================================================
          TOOLBAR
      ===================================================== */}
      <div className="
        services-admin-toolbar
      ">

        <div className="
          services-admin-search
        ">

          <FiSearch />

          <input
            type="text"

            placeholder="
              Search services...
            "

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* ====================================================
          GRID
      ===================================================== */}
      <div className="
        services-admin-grid
      ">

        {filteredServices.map(
          (
            service,
            index
          ) => (

          <motion.div
            key={service.id}

            className="
              service-admin-card
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
              delay:
                index * 0.08,
            }}
          >

            {/* TOP */}
            <div className="
              service-admin-card__top
            ">

              <div className="
                service-admin-card__icon
              ">

                {
                  service.icon
                }

              </div>


              <div className="
                service-admin-card__actions
              ">

                <button
                  onClick={() =>
                    openEditModal(
                      service
                    )
                  }
                >

                  <FiEdit2 />

                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      service.id
                    )
                  }
                >

                  <FiTrash2 />

                </button>

              </div>

            </div>


            {/* CONTENT */}
            <div className="
              service-admin-card__content
            ">

              <h3>

                {
                  service.title
                }

              </h3>

              <p>

                {
                  service.short_description ||

                  service.description
                }

              </p>

            </div>


            {/* FOOTER */}
            <div className="
              service-admin-card__footer
            ">

              <span
                className="
                  service-status
                  active
                "
              >

                Active

              </span>


              {service.featured && (

                <div className="
                  service-featured
                ">

                  <FiLayers />

                  Featured

                </div>
              )}

            </div>

          </motion.div>
        ))}

      </div>


      {/* ====================================================
          MODAL
      ===================================================== */}
      <AnimatePresence>

        {modalOpen && (

          <motion.div
            className="
              admin-modal
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
                admin-modal__backdrop
              "

              onClick={
                closeModal
              }
            />


            {/* CONTENT */}
            <motion.div
              className="
                admin-modal__content
              "

              initial={{
                opacity: 0,
                scale: 0.92,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                scale: 0.92,
              }}
            >

              {/* CLOSE */}
              <button
                className="
                  admin-modal__close
                "

                onClick={
                  closeModal
                }
              >

                <FiX />

              </button>


              {/* TITLE */}
              <h2>

                {editingService

                  ? "Edit Service"

                  : "Add Service"}

              </h2>


              {/* FORM */}
              <form
                className="
                  admin-form
                "

                onSubmit={
                  handleSubmit
                }
              >

                <input
                  type="text"

                  name="title"

                  placeholder="
                    Service Title
                  "

                  value={
                    formData.title
                  }

                  onChange={
                    handleChange
                  }

                  required
                />

                <input
                  type="text"

                  name="icon"

                  placeholder="
                    Icon Symbol
                  "

                  value={
                    formData.icon
                  }

                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"

                  name="cover_image"

                  placeholder="
                    Cover Image URL
                  "

                  value={
                    formData.cover_image
                  }

                  onChange={
                    handleChange
                  }
                />

                <textarea
                  name="
                    short_description
                  "

                  placeholder="
                    Short Description
                  "

                  rows="3"

                  value={
                    formData.short_description
                  }

                  onChange={
                    handleChange
                  }
                />

                <textarea
                  name="description"

                  placeholder="
                    Full Description
                  "

                  rows="5"

                  value={
                    formData.description
                  }

                  onChange={
                    handleChange
                  }

                  required
                />

                {/* FEATURED */}
                <label
                  className="
                    admin-checkbox
                  "
                >

                  <input
                    type="checkbox"

                    name="featured"

                    checked={
                      formData.featured
                    }

                    onChange={
                      handleChange
                    }
                  />

                  Featured Service

                </label>


                {/* BUTTON */}
                <button
                  type="submit"

                  className="
                    btn btn-primary
                  "

                  disabled={
                    submitting
                  }
                >

                  {submitting

                    ? "Saving..."

                    : editingService

                      ? "Update Service"

                      : "Create Service"}

                </button>

              </form>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default ServicesAdmin;