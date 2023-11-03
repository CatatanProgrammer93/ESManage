import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowItemSupplierTransaction() {
  const [itemsuppliertransactions, setItemSupplierTransactions] = useState([]);

  const deleteItemSupplierTransaction = (id) => {
    fetch(`https://localhost:7240/api/itemsupplier_transaction/${id}`, {
      method: "DELETE",
    }).then(() => {
      setItemSupplierTransactions(
        itemsuppliertransactions.filter(
          (itemsuppliertransaction) => itemsuppliertransaction.id !== id
        )
      );
    });
  };

  useEffect(() => {
    // Fetch ItemsSupplierTransaction
    fetch("https://localhost:7240/api/itemsupplier_transaction")
      .then((res) => res.json())
      .then((data) => setItemSupplierTransactions(data));
  }, []);

  return (
    <AppLayout>
      <h2 className="page-title mt-3">Item Supplier Transaction</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            <div className="mb-3">
              <Link
                to="/item-supplier-transaction/create"
                className="btn btn-primary"
              >
                Create new
              </Link>
            </div>
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Supplier ID</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Quantity</th>
                      <th>Notes</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsuppliertransactions.map((itemsuppliertransaction) => (
                      <tr key={itemsuppliertransaction.id}>
                        <td>{itemsuppliertransaction.id}</td>
                        <td>{itemsuppliertransaction.itemSupplierId}</td>
                        <td>{itemsuppliertransaction.transactionType}</td>
                        <td>{itemsuppliertransaction.transactionDate}</td>
                        <td>{itemsuppliertransaction.quantity}</td>
                        <td>{itemsuppliertransaction.notes}</td>
                        <td>
                          <Link
                            to={`/item-supplier-transaction/edit/${itemsuppliertransaction.id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() =>
                              deleteItemSupplierTransaction(
                                itemsuppliertransaction.id
                              )
                            }
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

export default ShowItemSupplierTransaction;
