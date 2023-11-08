import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom
import AppLayout from "../layouts/AppLayout";

function Dashboard() {
  const [displayName, setDisplayName] = useState("Guest");

  const location = useLocation();
  useEffect(() => {
    // Attempt to retrieve user information from location state first
    const userFromState = location.state?.user || null;

    // Attempt to retrieve user information from localStorage as a fallback
    const userFromStorageItem = localStorage.getItem("user");
    let userFromStorage = null;
    try {
      if (userFromStorageItem && userFromStorageItem !== "undefined") {
        userFromStorage = JSON.parse(userFromStorageItem);
      }
    } catch (e) {
      console.error(e);
    }

    // Use the user information from state if available, otherwise from storage
    const user = userFromState || userFromStorage;

    // Set the display name if a user is found
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
  }, [location]);

  return (
    <AppLayout>
      <h1>Welcome, {displayName}!</h1>
      <h2 className="page-title mt-3">Item Department</h2>
      <div className="mt-3 mb-3">
        <Link to="/item-department" className="btn btn-primary">
          Click here
        </Link>
      </div>
      <h2 className="page-title mt-3">Brand</h2>
      <div className="mt-3">
        <Link to="/brand" className="btn btn-primary">
          Click here
        </Link>
      </div>
      <h2 className="page-title mt-3">Item</h2>
      <div className="mt-3">
        <Link to="/item" className="btn btn-primary">
          Click here
        </Link>
      </div>
      <h2 className="page-title mt-3">Supplier</h2>
      <div className="mt-3">
        <Link to="/supplier" className="btn btn-primary">
          Click here
        </Link>
      </div>
      <h2 className="page-title mt-3">Item Supplier</h2>
      <div className="mt-3">
        <Link to="/item-supplier" className="btn btn-primary">
          Click here
        </Link>
      </div>
      <h2 className="page-title mt-3">Item Supplier Transaction</h2>
      <div className="mt-3">
        <Link to="/item-supplier-transaction" className="btn btn-primary">
          Click here
        </Link>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
