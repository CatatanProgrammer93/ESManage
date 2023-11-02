import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function CreateItemDepartment() {
  const [id, setId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [itemDepartmentParentId, setItemDepartmentParentId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let axiosConfig = {
        method: "POST",
        data: {
          id: id,
          categoryName: categoryName,
          itemDepartmentParentId: itemDepartmentParentId,
        },
        url: "https://localhost:7240/api/itemdepartment",
      };
      let response = await axios(axiosConfig);
      console.log(response.data);
      setId("");
      setCategoryName("");
      setItemDepartmentParentId("");
      navigate("/item-department");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <h2 className="page-title">Create a new item department</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label className="form-label">Item Department Parent ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the item department parent ID"
                value={itemDepartmentParentId}
                onChange={(e) => setItemDepartmentParentId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input type="submit" value="Save" className="btn btn-primary" />
            </div>
            <div className="mb-3">
              <Link to="/item-department" className="btn btn-primary">
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

export default CreateItemDepartment;
