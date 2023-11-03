import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowItem() {
  const [items, setItems] = useState([]);

  const deleteItem = (id) => {
    fetch(`https://localhost:7240/api/item/${id}`, {
      method: "DELETE",
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  useEffect(() => {
    // Fetch Items
    fetch("https://localhost:7240/api/item")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <AppLayout>
      <h2 className="page-title mt-3">Item</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            <div className="mb-3">
              <Link to="/item/create" className="btn btn-primary">
                Create new
              </Link>
            </div>
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>Category ID</th>
                      <th>Category Name</th>
                      <th>Brand ID</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.itemName}</td>
                        <td>{item.categoryId}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.brandId}</td>
                        <td>
                          <Link
                            to={`/item/edit/${item.id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteItem(item.id)}
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

export default ShowItem;
