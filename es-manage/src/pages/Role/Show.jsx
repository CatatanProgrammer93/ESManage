import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowRole() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

   const deleteRole = async(id) => {
    const rolePrivilegesResponse = await fetch(`https://localhost:7240/api/roleprivilege/roleid/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!rolePrivilegesResponse.ok) {
        // Handle error, maybe log or throw an exception
        console.error("Failed to fetch RolePrivileges");
        return;
    }

     const rolePrivileges = await rolePrivilegesResponse.json();

    await Promise.all(rolePrivileges.map(async (rolePrivilege) => {
        await fetch(`https://localhost:7240/api/roleprivilege/${rolePrivilege.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    }));

    fetch(`https://localhost:7240/api/role/${id}`, {
      method: "DELETE", 
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    }).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
    });
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
  
    useEffect(() => {
        if (!decodedToken["Show Role"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Role</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            {decodedToken["Create Role"] && (
                <div className="mb-3">
                    <Link to="/user/create" className="btn btn-primary">
                        Create new
                    </Link>
                </div>
            )}
            
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>RoleName</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.roleName}</td>
                        <td>
                          {decodedToken["Edit Role"] && (
                            <Link
                                to={`/role/edit/${role.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )}

                          {decodedToken["Delete Role"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteRole(role.id)}
                            >
                                Delete
                            </button>
                          )}
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ShowRole;
