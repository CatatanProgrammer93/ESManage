import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function CreateItem() {
  const [id, setId] = useState("");
  const [itemName, setItemName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [uom, setUom] = useState("");
  const [taxType, setTaxType] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [minimumRetailPrice, setMinimumRetailPrice] = useState(0);
  const [balanceQty, setBalanceQty] = useState(0);
  const [avgCostPrice, setAvgCostPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let axiosConfig = {
        method: "POST",
        url: "https://localhost:7240/api/item",
        data: {
          id,
          itemName,
          categoryId,
          categoryName,
          brandId,
          uom,
          taxType,
          taxRate,
          minimumRetailPrice,
          balanceQty,
          avgCostPrice,
          retailPrice,
          costPrice,
          createdBy,
        },
      };
      let response = await axios(axiosConfig);
      // Resetting all the fields
      setItemName("");
      setCategoryId("");
      setCategoryName("");
      setBrandId("");
      setUom("");
      setTaxType(0);
      setTaxRate(0);
      setMinimumRetailPrice(0);
      setBalanceQty(0);
      setAvgCostPrice(0);
      setRetailPrice(0);
      setCostPrice(0);
      navigate("/item");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <h2 className="page-title">Create a new item</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            {/* Brand ID Field */}
            <div className="mb-3">
              <label className="form-label">Brand ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the brand ID"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              />
            </div>

            {/* UOM Field */}
            <div className="mb-3">
              <label className="form-label">Unit Of Measure</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the unit of measure"
                value={uom}
                onChange={(e) => setUom(e.target.value)}
              />
            </div>

            {/* Tax Type Field */}
            <div className="mb-3">
              <label className="form-label">Tax Type</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the tax type"
                value={taxType}
                onChange={(e) => setTaxType(e.target.value)}
              />
            </div>

            {/* Tax Rate Field */}
            <div className="mb-3">
              <label className="form-label">Tax Rate</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the tax rate"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
            {/* Minimum Retail Price Field */}
            <div className="mb-3">
              <label className="form-label">Minimum Retail Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the minimum retail price"
                value={minimumRetailPrice}
                onChange={(e) => setMinimumRetailPrice(e.target.value)}
              />
            </div>

            {/* Balance Quantity Field */}
            <div className="mb-3">
              <label className="form-label">Balance Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the balance quantity"
                value={balanceQty}
                onChange={(e) => setBalanceQty(e.target.value)}
              />
            </div>

            {/* Average Cost Price Field */}
            <div className="mb-3">
              <label className="form-label">Average Cost Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the average cost price"
                value={avgCostPrice}
                onChange={(e) => setAvgCostPrice(e.target.value)}
              />
            </div>

            {/* Retail Price Field */}
            <div className="mb-3">
              <label className="form-label">Retail Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the retail price"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
              />
            </div>

            {/* Cost Price Field */}
            <div className="mb-3">
              <label className="form-label">Cost Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the cost price"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input type="submit" value="Save" className="btn btn-primary" />
            </div>
            <div className="mb-3">
              <Link to="/item" className="btn btn-primary">
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

export default CreateItem;
