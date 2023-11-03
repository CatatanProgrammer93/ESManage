import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function CreateItemSupplier() {
  const [id, setId] = useState("");
  const [itemId, setItemId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response = await axios({
        method: "POST",
        url: "https://localhost:7240/api/itemsupplier",
        data: {
          id: id,
          itemId: itemId,
          supplierId: supplierId,
          createdBy: createdBy,
        },
      });
      console.log(response.data);
      setId("");
      setItemId("");
      setSupplierId("");
      navigate("/item-supplier");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <h2 className="page-title">Create a new Item Supplier</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Item ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Item ID"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Supplier ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Supplier ID"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input type="submit" value="Save" className="btn btn-primary" />
            </div>
            <div className="mb-3">
              <Link to="/item-supplier" className="btn btn-primary">
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

export default CreateItemSupplier;
