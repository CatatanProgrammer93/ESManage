import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const deleteSupplier = (id) => {
    fetch(`https://localhost:7240/api/supplier/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    }).then(() => {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    });
  };

  useEffect(() => {
    // Fetch Supplier
    fetch("https://localhost:7240/api/supplier", {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    })
      .then((res) => res.json())
      .then((data) => setSuppliers(data));
  }, []);

    useEffect(() => {
        if (!decodedToken["Show Supplier"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Supplier</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            {decodedToken["Create Supplier"] && (
                <div className="mb-3">
                    <Link to="/supplier/create" className="btn btn-primary">
                        Create new
                    </Link>
                </div>
            )}
            
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Supplier Name</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.supplierName}</td>
                        <td>
                          {decodedToken["Edit Supplier"] && (
                            <Link
                                to={`/supplier/edit/${supplier.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )}

                          {decodedToken["Delete Supplier"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteSupplier(supplier.id)}
                            >
                                Delete
                            </button>
                          )}
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ShowSupplier;
