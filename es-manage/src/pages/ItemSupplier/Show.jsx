import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowItemSupplier() {
  const [itemsuppliers, setItemSuppliers] = useState([]);

  const deleteItemSupplier = (id) => {
    fetch(`https://localhost:7240/api/itemsupplier/${id}`, {
      method: "DELETE",
    }).then(() => {
      setItemSuppliers(
        itemsuppliers.filter((itemsupplier) => itemsupplier.id !== id)
      );
    });
  };

  useEffect(() => {
    // Fetch Item Departments
    fetch("https://localhost:7240/api/itemsupplier")
      .then((res) => res.json())
      .then((data) => setItemSuppliers(data));
  }, []);

  return (
    <AppLayout>
      <h2 className="page-title mt-3">Item Supplier</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            <div className="mb-3">
              <Link to="/item-supplier/create" className="btn btn-primary">
                Create new
              </Link>
            </div>
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item ID</th>
                      <th>Supplier ID</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsuppliers.map((itemsupplier) => (
                      <tr key={itemsupplier.id}>
                        <td>{itemsupplier.id}</td>
                        <td>{itemsupplier.itemId}</td>
                        <td>{itemsupplier.supplierId}</td>
                        <td>
                          <Link
                            to={`/item-supplier/edit/${itemsupplier.id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteItemSupplier(itemsupplier.id)}
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

export default ShowItemSupplier;
