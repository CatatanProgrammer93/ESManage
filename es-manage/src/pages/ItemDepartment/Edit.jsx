import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function EditItemDepartment() {
  const { id: urlId, categoryName: urlCategoryName } = useParams();
  const [id, setId] = useState(urlId);
  const [categoryName, setCategoryName] = useState(urlCategoryName);
  const [itemDepartmentParentId, setItemDepartmentParentId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Create an instance of useNavigate

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7240/api/itemdepartment/${id}/${categoryName}`
      );
      setId(response.data.id);
      setCategoryName(response.data.categoryName);
      setItemDepartmentParentId(response.data.itemDepartmentParentId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, categoryName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://localhost:7240/api/itemdepartment/${id}/${categoryName}`,
        {
          id: id,
          categoryName: categoryName,
          itemDepartmentParentId: itemDepartmentParentId,
        }
      );
      console.log(response.data);

      // Redirect to the Dashboard after successfully updating
      navigate("/item-department"); // Update this with the correct path to your Dashboard component
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <h2 className="page-title">Create Item Department</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled
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
                disabled
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

export default EditItemDepartment;
