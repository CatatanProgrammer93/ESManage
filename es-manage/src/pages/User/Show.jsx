import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

function ShowUser() {
  const [users, setUsers] = useState([]);

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const deleteBrand = (id) => {
    fetch(`https://localhost:7240/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  useEffect(() => {
    fetch("https://localhost:7240/api/users", {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
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
        throw new Error('Failed to fetch Role');
    }
    catch (error) {
        console.error(error);
        return [];
    }
  }

  useEffect(() => {
    const fetchDataForUsers = async () => {
        const updatedUsers = await Promise.all(
            users.map(async (user) => {
                try {
                    const roleData = await fetchRoleById(user.roleID);

                    return { ...user, roles: roleData};
                }
                catch (error) {
                    console.error(error);
                    return { ...user, roles: []};
                }
            })
        );
        setUsers((prevUsers) => updatedUsers);
    };
    fetchDataForUsers();
  }, [users]);

  return (
    <AppLayout>
      <h2 className="page-title">User</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            <div className="mb-3">
              <Link to="/user/create" className="btn btn-primary">
                Create new
              </Link>
            </div>
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
                          <Link
                            to={`/user/edit/${user.id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
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
