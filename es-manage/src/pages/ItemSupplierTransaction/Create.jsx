import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function CreateItemSupplierTransaction() {
  const [id, setId] = useState("");
  const [itemSupplierId, setItemSupplierId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionDate, setTransactionDate] = useState(""); // Example date
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itemSuppliers, setItemSuppliers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the item suppliers when the component mounts
    const fetchItemSuppliers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7240/api/itemsupplier"
        );
        setItemSuppliers(response.data);
      } catch (error) {
        console.error("Failed to fetch item suppliers", error);
      }
    };

    fetchItemSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response = await axios({
        method: "POST",
        url: "https://localhost:7240/api/itemsupplier_transaction",
        data: {
          id: id,
          itemSupplierId: itemSupplierId,
          transactionType: transactionType,
          transactionDate: transactionDate,
          quantity: quantity,
          notes: notes,
          createdBy: createdBy,
        },
      });
      console.log(response.data);
      setId("");
      setItemSupplierId("");
      setTransactionType("");
      setTransactionDate("");
      setQuantity(0);
      setNotes("");
      navigate("/item-supplier-transaction");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <h2 className="page-title">Create a new Item Supplier Transaction</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Dropdown for Item Supplier ID */}
              <div className="mb-3 col-6">
                <label className="form-label">Item Supplier ID</label>
                <select
                  className="form-select"
                  value={itemSupplierId}
                  onChange={(e) => setItemSupplierId(e.target.value)}
                >
                  <option value="">Select an Item Supplier</option>
                  {itemSuppliers.map((itemSupplier) => (
                    <option key={itemSupplier.id} value={itemSupplier.id}>
                      {itemSupplier.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Transaction Type</label>
                <select
                  className="form-select"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option value="">Select a transaction type</option>
                  <option value="pembelian">Pembelian</option>
                  <option value="penerimaan">Penerimaan</option>
                  <option value="pengembalian">Pengembalian</option>
                  <option value="pengiriman">Pengiriman</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Transaction Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                />
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter the quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  placeholder="Enter notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <input type="submit" value="Save" className="btn btn-primary" />
            </div>
            <div className="mb-3">
              <Link to="/item-supplier-transaction" className="btn btn-primary">
                Cancel
              </Link>
            </div>
          </form>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default CreateItemSupplierTransaction;
