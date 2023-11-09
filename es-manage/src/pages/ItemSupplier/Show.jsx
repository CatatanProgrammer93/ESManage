import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowItemSupplier() {
  const [itemsuppliers, setItemSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  function deleteItemSupplier(id) {
    // Call to the backend API to delete the item supplier
    fetch(`https://localhost:7240/api/itemsupplier/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // If successful, filter out the deleted item supplier from the state
        const updatedItemSuppliers = itemsuppliers.filter((is) => is.id !== id);
        setItemSuppliers(updatedItemSuppliers);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error deleting item supplier:", error);
      });
  }

  // Fetch items and suppliers separately
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("https://localhost:7240/api/item");
      const data = await res.json();
      setItems(data);
    };

    const fetchSuppliers = async () => {
      const res = await fetch("https://localhost:7240/api/supplier");
      const data = await res.json();
      setSuppliers(data);
    };

    fetchItems();
    fetchSuppliers();
  }, []);

  // Fetch Item Suppliers
  useEffect(() => {
    fetch("https://localhost:7240/api/itemsupplier")
      .then((res) => res.json())
      .then((itemsupplierData) => {
        // Enrich with item and supplier names
        const enrichedData = itemsupplierData.map((is) => {
          const item = items.find((item) => item.id === is.itemId);
          const supplier = suppliers.find((sup) => sup.id === is.supplierId);
          return {
            ...is,
            itemName: item ? item.itemName : "Unknown Item", // Replace 'name' with the actual property for item name
            supplierName: supplier ? supplier.supplierName : "Unknown Supplier", // Replace 'name' with the actual property for supplier name
          };
        });
        setItemSuppliers(enrichedData);
      });
  }, [items, suppliers]);

  return (
    <AppLayout>
      <h2 className="page-title">Item Supplier</h2>
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
                      <th>Item Name</th>
                      <th>Supplier Name</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsuppliers.map((itemsupplier) => (
                      <tr key={itemsupplier.id}>
                        <td>{itemsupplier.id}</td>
                        <td>{itemsupplier.itemName}</td>
                        <td>{itemsupplier.supplierName}</td>
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
