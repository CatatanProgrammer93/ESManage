import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowUser() {
const [users, setUsers] = useState([]);
const isMounted = useRef(true);
const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const deleteUser = (id) => {
    fetch(`https://localhost:7240/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7240/api/users", {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);
                fetchDataForUsers(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        const fetchDataForUsers = async (data) => {
            const updatedUsers = await Promise.all(
                data.map(async (user) => {
                    try {
                        const roleData = await fetchRoleById(user.roleID);

                        return { ...user, roles: roleData };
                    }
                    catch (error) {
                        console.error(error);
                        return { ...user, roles: [] };
                    }
                })
            );
            setUsers(updatedUsers);
            console.log(updatedUsers);
        };

        fetchData();
    }, []);

  const fetchRoleById = async (roleId) => {
    try {
        const response = await fetch(`https://localhost:7240/api/role/id/${roleId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Use the token from local storage
          },
        });
        if (response.ok) {
            const roleData = await response.json();
            return roleData;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
    }

    useEffect(() => {
        if (!decodedToken["Show User"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">User</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            {decodedToken["Create User"] && (
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
                      <th>UserName</th>
                      <th>DisplayName</th>
                      <th>Role</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.userName}</td>
                        <td>{user.displayName}</td>
                        <td>{user.roles && user.roles.roleName}</td>
                        <td>
                          {decodedToken["Edit User"] && (
                            <Link
                                to={`/user/edit/${user.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )}

                          {decodedToken["Delete User"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteUser(user.id)}
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

export default ShowUser;
