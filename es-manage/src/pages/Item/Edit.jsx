import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    itemName: "",
    categoryId: "",
    categoryName: "",
    brandId: "",
    uom: "",
    taxType: 0,
    taxRate: 0,
    minimumRetailPrice: 0,
    balanceQty: 0,
    avgCostPrice: 0,
    retailPrice: 0,
    costPrice: 0,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://localhost:7240/api/item/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://localhost:7240/api/item/${id}`,
        item
      );
      console.log(response.data);
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
      <h2 className="page-title">Edit Item</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the item name"
                value={item.itemName} // Modified line
                onChange={handleInputChange}
                name="itemName" // Added line
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the category ID"
                value={item.categoryId}
                onChange={handleInputChange}
                name="categoryId"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the category name"
                value={item.categoryName}
                onChange={handleInputChange}
                name="categoryName"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Brand ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the brand ID"
                value={item.brandId}
                onChange={handleInputChange}
                name="brandId"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Unit Of Measure</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the unit of measure"
                value={item.uom}
                onChange={handleInputChange}
                name="uom"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tax Type</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the tax type"
                value={item.taxType}
                onChange={handleInputChange}
                name="taxType"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tax Rate</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the tax rate"
                value={item.taxRate}
                onChange={handleInputChange}
                name="taxRate"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Minimum Retail Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the minimum retail price"
                value={item.minimumRetailPrice}
                onChange={handleInputChange}
                name="minimumRetailPrice"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Balance Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the balance quantity"
                value={item.balanceQty}
                onChange={handleInputChange}
                name="balanceQty"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Average Cost Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the average cost price"
                value={item.avgCostPrice}
                onChange={handleInputChange}
                name="avgCostPrice"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Retail Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the retail price"
                value={item.retailPrice}
                onChange={handleInputChange}
                name="retailPrice"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cost Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the cost price"
                value={item.costPrice}
                onChange={handleInputChange}
                name="costPrice"
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

export default EditItem;
