import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom
import AppLayout from "../layouts/AppLayout";

function Dashboard() {
  return (
    <AppLayout>
      <h2 className="page-title">Item Department</h2>
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
