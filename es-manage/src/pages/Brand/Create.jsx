import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function CreateBrand() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
        method: "POST",
        url: "https://localhost:7240/api/brand",
        data: {
          name: name,
        },
      };
      let response = await axios(axiosConfig);
      console.log(response.data);
      setName("");
      navigate("/brand");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
        if (!decodedToken["Create Brand"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Create a new Brand</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Brand Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the brand name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <div className="mb-3">
                    <input type="submit" value="Save" className="btn btn-green" />
                </div>
                <div className="mb-3">
                    <Link to="/item" className="btn btn-red">
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

export default CreateBrand;
