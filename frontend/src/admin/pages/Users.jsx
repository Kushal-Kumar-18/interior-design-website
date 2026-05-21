import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  FiSearch,
  FiUserCheck,
  FiUserX,
  FiTrash2,
  FiShield,
} from "react-icons/fi";

import "../styles/users.css";


// ============================================================
// DUMMY USERS
// ============================================================
const initialUsers = [

  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    role: "Customer",
    status: "Active",
    joined: "12 Aug 2026",
  },

  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@gmail.com",
    role: "Customer",
    status: "Blocked",
    joined: "08 Aug 2026",
  },

  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    role: "Admin",
    status: "Active",
    joined: "02 Aug 2026",
  },

];


// ============================================================
// COMPONENT
// ============================================================
function Users() {

  // ==========================================================
  // STATE
  // ==========================================================
  const [users,
    setUsers] =
    useState(initialUsers);

  const [search,
    setSearch] =
    useState("");


  // ==========================================================
  // FILTERED USERS
  // ==========================================================
  const filteredUsers =
    users.filter(
      (user) =>

        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  // ==========================================================
  // TOGGLE STATUS
  // ==========================================================
  const toggleStatus = (
    id
  ) => {

    setUsers(

      users.map(
        (
          user
        ) =>

          user.id === id

            ? {
                ...user,

                status:
                  user.status ===
                  "Active"

                    ? "Blocked"

                    : "Active",
              }

            : user
      )
    );
  };


  // ==========================================================
  // DELETE
  // ==========================================================
  const deleteUser = (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (
      confirmDelete
    ) {

      setUsers(

        users.filter(
          (
            user
          ) =>
            user.id !== id
        )
      );
    }
  };


  // ==========================================================
  // RENDER
  // ==========================================================
  return (

    <div className="admin-users">

      {/* ======================================================
          HEADER
      ======================================================= */}
      <div className="users-header">

        <div>

          <h1>
            User Management
          </h1>

          <p>
            Manage customers,
            admins and permissions.
          </p>

        </div>

      </div>


      {/* ======================================================
          TOOLBAR
      ======================================================= */}
      <div className="users-toolbar">

        <div
          className="
            users-search
          "
        >

          <FiSearch />

          <input
            type="text"

            placeholder="
              Search users...
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


      {/* ======================================================
          TABLE
      ======================================================= */}
      <motion.div
        className="
          users-table-wrapper
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
            users-table
          "
        >

          <thead>

            <tr>

              <th>
                User
              </th>

              <th>
                Role
              </th>

              <th>
                Status
              </th>

              <th>
                Joined
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredUsers.map(
              (
                user
              ) => (

              <tr
                key={user.id}
              >

                {/* USER */}
                <td>

                  <div
                    className="
                      user-info
                    "
                  >

                    <div
                      className="
                        user-avatar
                      "
                    >

                      {user.name[0]}

                    </div>


                    <div>

                      <h4>

                        {user.name}

                      </h4>

                      <p>

                        {user.email}

                      </p>

                    </div>

                  </div>

                </td>


                {/* ROLE */}
                <td>

                  <div
                    className={`
                      user-role
                      ${user.role
                        .toLowerCase()}
                    `}
                  >

                    <FiShield />

                    {user.role}

                  </div>

                </td>


                {/* STATUS */}
                <td>

                  <span
                    className={`
                      user-status
                      ${user.status
                        .toLowerCase()}
                    `}
                  >

                    {user.status}

                  </span>

                </td>


                {/* JOINED */}
                <td>

                  {user.joined}

                </td>


                {/* ACTIONS */}
                <td>

                  <div
                    className="
                      user-actions
                    "
                  >

                    <button
                      className="
                        activate-btn
                      "

                      onClick={() =>
                        toggleStatus(
                          user.id
                        )
                      }
                    >

                      {user.status ===
                      "Active"

                        ? <FiUserX />

                        : <FiUserCheck />
                      }

                    </button>


                    <button
                      className="
                        delete-btn
                      "

                      onClick={() =>
                        deleteUser(
                          user.id
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

    </div>
  );
}

export default Users;