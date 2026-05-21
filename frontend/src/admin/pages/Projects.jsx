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

  FiX,

} from "react-icons/fi";

import {
  projectAPI,
} from "../../api/api";

import Loader from "../../components/Loader";

import "../styles/projects.css";


// ============================================================
// INITIAL FORM
// ============================================================
const INITIAL_FORM = {

  title: "",

  category: "",

  short_description: "",

  description: "",

  cover_image: "",

  featured: false,
};


// ============================================================
// COMPONENT
// ============================================================
function Projects() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingProject,
    setEditingProject] =
    useState(null);

  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [submitting,
    setSubmitting] =
    useState(false);


  // ==========================================================
  // FETCH PROJECTS
  // ==========================================================
  const fetchProjects =
    async () => {

      try {

        setLoading(true);

        const response =

          await projectAPI.getProjects();

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

        console.error(err);

        setError(
          "Failed to load projects."
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchProjects();

  }, []);


  // ==========================================================
  // FILTERED
  // ==========================================================
  const filteredProjects =
    useMemo(() => {

      return projects.filter(
        (project) =>

          project.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [projects, search]);


  // ==========================================================
  // OPEN CREATE
  // ==========================================================
  const openCreateModal = () => {

    setEditingProject(null);

    setFormData(
      INITIAL_FORM
    );

    setModalOpen(true);
  };


  // ==========================================================
  // OPEN EDIT
  // ==========================================================
  const openEditModal = (
    project
  ) => {

    setEditingProject(
      project
    );

    setFormData({

      title:
        project.title || "",

      category:
        project.category || "",

      short_description:
        project.short_description || "",

      description:
        project.description || "",

      cover_image:
        project.cover_image || "",

      featured:
        project.featured || false,
    });

    setModalOpen(true);
  };


  // ==========================================================
  // CLOSE MODAL
  // ==========================================================
  const closeModal = () => {

    setModalOpen(false);

    setEditingProject(null);

    setFormData(
      INITIAL_FORM
    );
  };


  // ==========================================================
  // CHANGE
  // ==========================================================
  const handleChange = (e) => {

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

        if (editingProject) {

          await projectAPI.updateProject(

            editingProject.id,

            formData
          );

        } else {

          await projectAPI.createProject(
            formData
          );
        }

        await fetchProjects();

        closeModal();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to save project."
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
          "Delete this project?"
        );

      if (!confirmDelete) {

        return;
      }

      try {

        await projectAPI.deleteProject(
          id
        );

        await fetchProjects();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to delete project."
        );
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader
        text="Loading Projects"
      />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="
        admin-projects-error
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
      admin-projects
    ">

      {/* ====================================================
          HEADER
      ===================================================== */}
      <div className="
        projects-header
      ">

        <div>

          <h1>
            Projects Management
          </h1>

          <p>
            Manage all portfolio projects.
          </p>

        </div>


        <button
          className="
            projects-add-btn
          "

          onClick={
            openCreateModal
          }
        >

          <FiPlus />

          Add Project

        </button>

      </div>


      {/* ====================================================
          SEARCH
      ===================================================== */}
      <div className="
        projects-toolbar
      ">

        <div className="
          projects-search
        ">

          <FiSearch />

          <input
            type="text"

            placeholder="
              Search projects...
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
          TABLE
      ===================================================== */}
      <motion.div
        className="
          projects-table-wrapper
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

        <table
          className="
            projects-table
          "
        >

          <thead>

            <tr>

              <th>
                Project
              </th>

              <th>
                Category
              </th>

              <th>
                Featured
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredProjects.map(
              (project) => (

              <tr
                key={project.id}
              >

                {/* PROJECT */}
                <td>

                  <div className="
                    project-info
                  ">

                    <img
                      src={
                        project.cover_image
                      }

                      alt={
                        project.title
                      }
                    />

                    <div>

                      <h4>

                        {
                          project.title
                        }

                      </h4>

                    </div>

                  </div>

                </td>


                {/* CATEGORY */}
                <td>

                  {
                    project.category
                  }

                </td>


                {/* FEATURED */}
                <td>

                  <span
                    className={`
                      project-status
                      ${project.featured
                        ? "published"
                        : "draft"}
                    `}
                  >

                    {project.featured

                      ? "Featured"

                      : "Normal"}

                  </span>

                </td>


                {/* ACTIONS */}
                <td>

                  <div className="
                    project-actions
                  ">

                    <button
                      onClick={() =>
                        openEditModal(
                          project
                        )
                      }
                    >

                      <FiEdit2 />

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          project.id
                        )
                      }
                    >

                      <FiTrash2 />

                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </motion.div>


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

                {editingProject

                  ? "Edit Project"

                  : "Add Project"}

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
                    Project Title
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

                  name="category"

                  placeholder="
                    Category
                  "

                  value={
                    formData.category
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

                  Featured Project

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

                    : editingProject

                      ? "Update Project"

                      : "Create Project"}

                </button>

              </form>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default Projects;