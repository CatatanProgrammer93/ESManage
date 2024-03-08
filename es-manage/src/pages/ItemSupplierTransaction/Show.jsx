import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ShowItemSupplierTransaction() {
  const [itemsuppliertransactions, setItemSupplierTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [itemsuppliers, setItemSuppliers] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();


  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const deleteItemSupplierTransaction = (id) => {
    fetch(`https://localhost:7240/api/itemsupplier_transaction/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    }).then(() => {
      setItemSupplierTransactions(
        itemsuppliertransactions.filter((tx) => tx.id !== id)
      );
    });
  };

  const handleReturn = async (e) => {
    try {
      const timeelapsed = Date.now();
      const today = new Date(timeelapsed);
      e.transactionDate = today.toISOString();
      let response = await axios.post(
        "https://localhost:7240/api/itemsupplier_transaction",
        {
          id: e.id,
          itemId: e.itemId,
          supplierId: e.supplierId,
          transactionType: "pengembalian",
          transactionDate: e.transactionDate,
          quantity: e.quantity,
          notes: "Pengembalian dari id transaksi: " + e.id,
          createdBy: e.createdBy,
          userId : decodedToken[["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );

      const date = new Date(timeelapsed).toISOString();

      let responseReport = await axios.post(
        "https://localhost:7240/api/report",
        {
          id: "",
          type: "Create",
          tableName: "Item Supplier Transaction",
          details: "ID: " + response.data.id + 
          "\n\ItemSupplier Id: " + response.data.itemSupplierId +
          "\n\Transaction Type: " + response.data.transactionType +
          "\n\Transaction Date: " + response.data.transactionDate +
          "\n\Quantity: " + response.data.quantity +
          "\n\Notes: " + response.data.notes +
          "\n\Created By: " + response.data.createdBy +
          "\n\User Id: " + response.data.userId,
          date
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );

      let response2 = await axios.get(
        "https://localhost:7240/api/stok/itemid/" + e.itemId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          }
        }
      );
      let responseReport2 = await axios.post(
        "https://localhost:7240/api/report",
        {
          id: "",
          type: "Create",
          tableName: "Stok",
          details: "ID: " + response2.data.id + 
          "\n\Item Id: " + response2.data.itemId +
          "\n\Stok: " + response2.data.stok,
          date
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );
      if (response2 && response2.data && response2.data.id) {
        const stokid = response2.data.id;
    
        let updatedQuantity = "";
        updatedQuantity = parseInt(response2.data.stok) + parseInt(e.quantity);
    
        // Lakukan permintaan PUT untuk memperbarui stok dengan jumlah yang telah diperbarui
        let response3 = await axios.put(
          `https://localhost:7240/api/stok/${stokid}`,
          { id: stokid,
            itemId: e.itemId,
            stok: updatedQuantity.toString(),
            deleted: false},
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
    
        console.log(response3.data);
      } else {
        console.error("Error: Stock data not found.");
      }
      
      
      console.log(response.data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchResource = async (url, setter) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        });
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResource("https://localhost:7240/api/item", setItems);
    fetchResource("https://localhost:7240/api/supplier", setSuppliers);
    fetchResource("https://localhost:7240/api/itemsupplier", setItemSuppliers);
    fetchResource("https://localhost:7240/api/users", setUsers);
  }, []);

  useEffect(() => {
    const fetchTransactionsAndEnrich = async () => {
      try {
        const response = await fetch(
          "https://localhost:7240/api/itemsupplier_transaction",
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Include the token from local storage
            },
          }
        );
        const transactionsData = await response.json();

        if (items.length && suppliers.length && itemsuppliers.length && users.length) {
          const enrichedData = transactionsData.map((tx) => {
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
            const item = items.find(
              (itm) => itm.id.toString() === itemSupplier.itemId.toString()
            );
            const supplier = suppliers.find(
              (sup) => sup.id.toString() === itemSupplier.supplierId.toString()
            );
            const user = users.find(
              (usr) => usr.id === tx.userId
            );

            return {
              ...tx,
              itemName: item ? item.itemName : "Unknown Item",
              itemId: item ? item.id: "",
              supplierName: supplier
                ? supplier.supplierName
                : "Unknown Supplier",
              supplierId: supplier ? supplier.id : "",
              userName: user ? user.displayName : "-",
              checkName: user ? user.userName : "-",
            };
          });

          setItemSupplierTransactions(enrichedData);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactionsAndEnrich();
  }, [items, suppliers, itemsuppliers, users]);

  useEffect(() => {
    if (!decodedToken["Show Item Supplier Transaction"]) {
      navigate("/dashboard");
    }
  }, []);


  return (
    <AppLayout>
      <h2 className="page-title">Item Supplier Transaction</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            {decodedToken["Create Item Supplier Transaction"] && (
              <div className="mb-3">
                <Link
                  to="/item-supplier-transaction/create"
                  className="btn btn-primary"
                >
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
                      <th>Item Name</th>
                      <th>Supplier Name</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Quantity</th>
                      <th>Notes</th>
                      <th>User</th>
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
                        <td style={{whiteSpace: 'pre'}}>{itemsuppliertransaction.notes}</td>
                        <td>{itemsuppliertransaction.userName}</td>
                        <td style={{ display: 'flex' }}>
                          {decodedToken["Edit Item Supplier Transaction"] && (
                            <Link
                              to={`/item-supplier-transaction/edit/${itemsuppliertransaction.id}`}
                              className="btn btn-primary"
                            >
                              Edit
                            </Link>
                          )}

                          {decodedToken["Delete Item Supplier Transaction"] && (
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
                          )}

                          {itemsuppliertransaction.transactionType === "peminjaman" && decodedToken[["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]] === itemsuppliertransaction.checkName &&
                          !itemsuppliertransactions.some(tx => tx.transactionType === "pengembalian" && tx.notes.split(":")[1].trim() === itemsuppliertransaction.id)  && (
                            <button
                              className="btn btn-success mx-2"
                              onClick={ () => handleReturn(itemsuppliertransaction)}
                            >
                              Return
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

export default ShowItemSupplierTransaction;
