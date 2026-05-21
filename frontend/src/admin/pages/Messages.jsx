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

  FiSearch,

  FiEye,

  FiTrash2,

  FiMail,

  FiCheckCircle,

} from "react-icons/fi";

import {
  contactAPI,
} from "../../api/api";

import Loader from "../../components/Loader";

import "../styles/messages.css";


// ============================================================
// COMPONENT
// ============================================================
function Messages() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [
    selectedMessage,
    setSelectedMessage,
  ] = useState(null);


  // ==========================================================
  // FETCH MESSAGES
  // ==========================================================
  const fetchMessages =
    async () => {

      try {

        setLoading(true);

        const response =

          await contactAPI.getMessages();

        const safeMessages =

          response?.data ||

          [];

        setMessages(

          Array.isArray(
            safeMessages
          )
            ? safeMessages
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load messages."
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchMessages();

  }, []);


  // ==========================================================
  // FILTERED
  // ==========================================================
  const filteredMessages =
    useMemo(() => {

      return messages.filter(
        (message) =>

          message.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          message.email
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          message.subject
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [messages, search]);


  // ==========================================================
  // MARK READ
  // ==========================================================
  const markAsRead =
    async (id) => {

      try {

        await contactAPI.markAsRead(
          id
        );

        await fetchMessages();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to mark as read."
        );
      }
    };


  // ==========================================================
  // DELETE
  // ==========================================================
  const deleteMessage =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this message?"
        );

      if (!confirmDelete) {

        return;
      }

      try {

        await contactAPI.deleteMessage(
          id
        );

        await fetchMessages();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to delete message."
        );
      }
    };


  // ==========================================================
  // LOADING
  // ==========================================================
  if (loading) {

    return (
      <Loader
        text="Loading Messages"
      />
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================
  if (error) {

    return (

      <div className="
        admin-messages-error
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
      admin-messages
    ">

      {/* ====================================================
          HEADER
      ===================================================== */}
      <div className="
        messages-header
      ">

        <div>

          <h1>
            Contact Messages
          </h1>

          <p>
            Manage inquiries and
            customer messages.
          </p>

        </div>

      </div>


      {/* ====================================================
          TOOLBAR
      ===================================================== */}
      <div className="
        messages-toolbar
      ">

        <div className="
          messages-search
        ">

          <FiSearch />

          <input
            type="text"

            placeholder="
              Search messages...
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
          LIST
      ===================================================== */}
      <div className="
        messages-list
      ">

        {filteredMessages.map(
          (
            message,
            index
          ) => (

          <motion.div
            key={message.id}

            className={`
              message-card
              ${message.is_read
                ? "read"
                : "unread"}
            `}

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
                index * 0.05,
            }}
          >

            {/* LEFT */}
            <div className="
              message-card__left
            ">

              <div className="
                message-avatar
              ">

                {
                  message.name?.[0]
                }

              </div>

            </div>


            {/* CONTENT */}
            <div className="
              message-card__content
            ">

              <div className="
                message-card__top
              ">

                <h3>

                  {
                    message.name
                  }

                </h3>

                <span>

                  {
                    message.email
                  }

                </span>

              </div>

              <h4>

                {
                  message.subject ||
                  "No Subject"
                }

              </h4>

              <p>

                {
                  message.message
                    ?.slice(0, 120)
                }...

              </p>

            </div>


            {/* ACTIONS */}
            <div className="
              message-card__actions
            ">

              {!message.is_read && (

                <button
                  className="
                    read-btn
                  "

                  onClick={() =>
                    markAsRead(
                      message.id
                    )
                  }
                >

                  <FiCheckCircle />

                </button>
              )}


              <button
                className="
                  view-btn
                "

                onClick={() =>
                  setSelectedMessage(
                    message
                  )
                }
              >

                <FiEye />

              </button>


              <button
                className="
                  delete-btn
                "

                onClick={() =>
                  deleteMessage(
                    message.id
                  )
                }
              >

                <FiTrash2 />

              </button>

            </div>

          </motion.div>
        ))}

      </div>


      {/* ====================================================
          MODAL
      ===================================================== */}
      <AnimatePresence>

        {selectedMessage && (

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

              onClick={() =>
                setSelectedMessage(
                  null
                )
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

              <div className="
                message-modal__header
              ">

                <FiMail />

                <h2>
                  Message Details
                </h2>

              </div>


              <div className="
                message-details
              ">

                <p>

                  <strong>
                    Name:
                  </strong>

                  {
                    selectedMessage.name
                  }

                </p>

                <p>

                  <strong>
                    Email:
                  </strong>

                  {
                    selectedMessage.email
                  }

                </p>

                <p>

                  <strong>
                    Subject:
                  </strong>

                  {
                    selectedMessage.subject ||
                    "No Subject"
                  }

                </p>

                <p>

                  <strong>
                    Date:
                  </strong>

                  {new Date(
                    selectedMessage.created_at
                  ).toLocaleString()}

                </p>

                <div className="
                  message-full-content
                ">

                  {
                    selectedMessage.message
                  }

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default Messages;