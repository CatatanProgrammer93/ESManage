import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowItemSupplierTransaction() {
  const [itemsuppliertransactions, setItemSupplierTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [itemsuppliers, setItemSuppliers] = useState([]); // Define the state for itemSuppliers

  const deleteItemSupplierTransaction = (id) => {
    fetch(`https://localhost:7240/api/itemsupplier_transaction/${id}`, {
      method: "DELETE",
    }).then(() => {
      setItemSupplierTransactions(
        itemsuppliertransactions.filter((tx) => tx.id !== id)
      );
    });
  };

  useEffect(() => {
    // Fetch items and suppliers separately
    const fetchItems = async () => {
      const response = await fetch("https://localhost:7240/api/item");
      const data = await response.json();
      setItems(data);
    };

    const fetchSuppliers = async () => {
      const response = await fetch("https://localhost:7240/api/supplier");
      const data = await response.json();
      setSuppliers(data);
    };

    const fetchItemSuppliers = async () => {
      const response = await fetch("https://localhost:7240/api/itemsupplier");
      const data = await response.json();
      setItemSuppliers(data);
    };

    fetchItems();
    fetchSuppliers();
    fetchItemSuppliers();
  }, []);

  useEffect(() => {
    const fetchTransactionsAndEnrich = async () => {
      const transactionsResponse = await fetch(
        "https://localhost:7240/api/itemsupplier_transaction"
      );
      const transactionsData = await transactionsResponse.json();

      // Wait until items and suppliers data is fetched before enriching transactions
      if (items.length && suppliers.length && itemsuppliers.length) {
        const enrichedData = transactionsData.map((tx) => {
          // Find the corresponding itemSupplier
          const itemSupplier = itemsuppliers.find(
            (is) => is.id.toString() === tx.itemSupplierId.toString()
          );
          if (!itemSupplier) {
            return {
              ...tx,
              itemName: "Unknown Item",
              supplierName: "Unknown Supplier",
            };
          }
          // Find the actual item and supplier using itemId and supplierId from itemSupplier
          const item = items.find(
            (itm) => itm.id.toString() === itemSupplier.itemId.toString()
          );
          const supplier = suppliers.find(
            (sup) => sup.id.toString() === itemSupplier.supplierId.toString()
          );

          return {
            ...tx,
            itemName: item ? item.itemName : "Unknown Item", // Make sure 'name' is the correct property name for item name
            supplierName: supplier ? supplier.supplierName : "Unknown Supplier", // Make sure 'name' is the correct property name for supplier name
          };
        });

        setItemSupplierTransactions(enrichedData);
      }
    };

    fetchTransactionsAndEnrich();
  }, [items, suppliers, itemsuppliers]); // Dependency array ensures useEffect is re-run when these values change

  return (
    <AppLayout>
      <h2 className="page-title">Item Supplier Transaction</h2>
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
                      <th>Item Name</th>
                      <th>Supplier Name</th>
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
                        <td>{itemsuppliertransaction.itemName}</td>
                        <td>{itemsuppliertransaction.supplierName}</td>
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
