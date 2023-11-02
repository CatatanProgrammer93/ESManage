import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowBrand() {
  const [brands, setBrands] = useState([]);

  const deleteBrand = (id) => {
    fetch(`https://localhost:7240/api/brand/${id}`, {
      method: "DELETE",
    }).then(() => {
      setBrands(brands.filter((brand) => brand.id !== id));
    });
  };

  useEffect(() => {
    fetch("https://localhost:7240/api/brand")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  return (
    <AppLayout>
      <Link to="/dashboard" className="mb-3">
        Go to Dashboard
      </Link>
      <h2 className="page-title mt-3">Brands</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            <div className="mb-3">
              <Link to="/brand/create" className="btn btn-primary">
                Create new
              </Link>
            </div>
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Brand Name</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((brand) => (
                      <tr key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.name}</td>
                        <td>
                          <Link
                            to={`/brand/edit/${brand.id}`}
                            className="btn btn-primary mr-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteBrand(brand.id)}
                          >
                            Delete
                          </button>
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

export default ShowBrand;
