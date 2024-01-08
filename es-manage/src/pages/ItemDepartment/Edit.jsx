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
    const [parent, setParent] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [tempItemDepartmentParentId, setTempItemDepartmentParentId] = useState("");

  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
          `https://localhost:7240/api/itemdepartment/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );
      setId(response.data.id);
      setCategoryName(response.data.categoryName);
        setItemDepartmentParentId(response.data.itemDepartmentParentId);
        setTempItemDepartmentParentId(response.data.itemDepartmentParentId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const effectiveItemDepartmentParentId = parent
      ? "0"
      : tempItemDepartmentParentId;

    try {
      const response = await axios.put(
        `https://localhost:7240/api/itemdepartment/${id}/${categoryName}`,
        {
          id: id,
          categoryName: categoryName,
          itemDepartmentParentId: effectiveItemDepartmentParentId,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );
      console.log(response.data);
      navigate("/item-department"); // Update this with the correct path to your Dashboard component
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
    };

    useEffect(() => {
        if (itemDepartmentParentId !== "") {
            setParent(itemDepartmentParentId === "0");
        }
    }, [itemDepartmentParentId]);

    useEffect(() => {
        // Fetch Item Departments
        fetch("https://localhost:7240/api/itemdepartment", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`, // Use the token from local storage
            },
        })
            .then((res) => res.json())
            .then((data) => setDepartments(data));
    }, []);

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
              <label className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={parent}
                  onChange={() => setParent(!parent)}
                />
                <span className="form-check-label">Use as a parent?</span>
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">Item Department</label>
                <select
                    className="form-select"
                    value={tempItemDepartmentParentId}
                    onChange={(e) => setTempItemDepartmentParentId(e.target.value)}
                    disabled={parent}
                >
                    <option value="">Enter the item department</option>
                    {departments
                        .filter(item => item.itemDepartmentParentId == 0 && item.id !== id)
                        .map(item => (
                            <option key={item.id} value={item.id}>
                                {item.categoryName}
                            </option>
                        ))}
                </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <div className="mb-3">
                    <input type="submit" value="Save" className="btn btn-green" />
                </div>
                <div className="mb-3">
                    <Link to="/item-department" className="btn btn-red">
                        Cancel
                    </Link>
                </div>
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
