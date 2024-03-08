import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function EditBrand() {
  const { id } = useParams(); // Extracting the 'id' parameter
  const navigate = useNavigate(); // Create an instance of useNavigate

  const [brand, setBrand] = useState({
    id: id,
    name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7240/api/brand/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );
        setBrand(response.data); // Update the state with the received data
        console.log(response.data);
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
    try {
      const response = await axios.put(
        `https://localhost:7240/api/brand/${id}`,
        brand,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );

      const timeelapsed = Date.now();
      const date = new Date(timeelapsed).toISOString();

      let response2 = await axios.post(
        "https://localhost:7240/api/report",
        {
          id: "",
          type: "Update",
          tableName: "Brand",
          details: "ID: " + response.data.id + 
          "\n\Name: " + response.data.name +
          "\n\Created By: " + response.data.createdBy,
          date
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        }
      );


      console.log(response.data);

      // Redirect to the desired page after successfully updating
      navigate("/brand"); // Update this with the correct path
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
        if (!decodedToken["Edit Brand"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Edit Brand</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the ID"
                value={brand.id}
                onChange={(e) => setBrand({ ...brand, id: e.target.value })}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Brand Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the brand name"
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <div className="mb-3">
                    <input type="submit" value="Save" className="btn btn-green" />
                </div>
                <div className="mb-3">
                    <Link to="/brand" className="btn btn-red">
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

export default EditBrand;
