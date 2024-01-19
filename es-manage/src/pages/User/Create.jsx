import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
        method: "POST",
        url: "https://localhost:7240/api/users",
        data: {
          userName: username,
          displayName: displayname,
          password: password,
          roleID: roleId
        },
      };
      let response = await axios(axiosConfig);
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://localhost:7240/api/role", {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    })
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Create a new User</h2>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Display Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the display name"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter the confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
          {/* role Dropdown */}
          <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <div className="mb-3">
                    <input type="submit" value="Save" className="btn btn-green" />
                </div>
                <div className="mb-3">
                    <Link to="/user" className="btn btn-red">
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

export default CreateUser;