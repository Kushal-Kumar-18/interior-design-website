import {
  Navigate,
} from "react-router-dom";

import Loader from "../../components/Loader";


// ============================================================
// COMPONENT
// ============================================================
function ProtectedAdminRoute({

  children

}) {

  // ==========================================================
  // STORAGE
  // ==========================================================
  const adminToken =

    localStorage.getItem(
      "adminToken"
    );

  const adminUser =

    localStorage.getItem(
      "adminUser"
    );


  // ==========================================================
  // SAFETY LOADER
  // ==========================================================
  if (

    adminToken === undefined ||

    adminUser === undefined

  ) {

    return (

      <Loader
        text="Checking Admin Access"
      />
    );
  }


  // ==========================================================
  // NOT LOGGED IN
  // ==========================================================
  if (

    !adminToken ||

    !adminUser

  ) {

    return (

      <Navigate
        to="/admin/login"
        replace
      />
    );
  }


  // ==========================================================
  // AUTHORIZED
  // ==========================================================
  return children;
}

export default ProtectedAdminRoute;