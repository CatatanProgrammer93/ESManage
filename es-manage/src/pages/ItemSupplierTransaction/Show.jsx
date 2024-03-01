import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

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

  const handleReturn = async (transactionId) => {
    try {
      // Mendapatkan data transaksi berdasarkan ID atau menggunakan state jika sudah disimpan
      const returnedTransaction = itemsuppliertransactions.find(
        (t) => t.id === transactionId
      );

      // Memastikan transaksi ditemukan
      if (returnedTransaction) {
        // Memeriksa apakah tipe transaksi adalah "peminjaman" dan nama di token cocok
        if (
          returnedTransaction.transactionType === "peminjaman" &&
          decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ===
          returnedTransaction.checkName
        ) {
          // Mengubah status transaksi menjadi "pengembalian"
          returnedTransaction.transactionType = "pengembalian";

          // Menambahkan jumlah barang yang dikembalikan ke stok
          const returnedItems = returnedTransaction.items;
          for (const returnedItem of returnedItems) {
            const itemToUpdate = items.find((item) => item.id === returnedItem.id);

            // Memastikan item ditemukan
            if (itemToUpdate) {
              // Lakukan pembaruan stok melalui API atau fungsi lainnya
              const updatedStock = itemToUpdate.stock + returnedItem.quantity;

              // Simulasikan pembaruan stok pada item melalui API
              await fetch(`https://localhost:7240/api/item/${itemToUpdate.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                  stock: updatedStock,
                }),
              });

              // Mengupdate state items jika menggunakan state
              setItems((prevItems) =>
                prevItems.map((item) =>
                  item.id === itemToUpdate.id ? { ...item, stock: updatedStock } : item
                )
              );
            }
          }

          // Memperbarui state transaksi jika menggunakan state
          setItemSupplierTransactions([...itemsuppliertransactions]);
        } else {
          // Tampilkan pesan atau ambil tindakan lain jika kondisi tidak memenuhi
          console.warn("Transaction cannot be returned. Invalid conditions.");
        }
      }
    } catch (error) {
      console.error("Error handling return:", error);
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
              supplierName: supplier
                ? supplier.supplierName
                : "Unknown Supplier",
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
                        <td>{itemsuppliertransaction.notes}</td>
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

                          {itemsuppliertransaction.transactionType === "peminjaman" && decodedToken[["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]] === itemsuppliertransaction.checkName && (
                            <button
                              className="btn btn-success mx-2"
                              onClick={ () => handleReturn(itemsuppliertransacction.id)}
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
