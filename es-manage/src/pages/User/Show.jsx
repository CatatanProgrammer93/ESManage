import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowUser() {
var queryParams = new URLSearchParams(window.location.search);
const [search, setSearch] = useState(queryParams.get("search") || "");
const [page, setPage] = useState(queryParams.get("page") || "1");
queryParams.set("search", search);
queryParams.set("page", page);
history.replaceState(null, null, "?" + queryParams.toString());
const [limit, setLimit] = useState("10");
const [totalPages, setTotalPages] = useState(1);
const [users, setUsers] = useState([]);
const [searchUsers, setSearchUsers] = useState([]);
const [limitedUsers, setLimitedUsers] = useState([]);
const isMounted = useRef(true);
const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const handleRadioChange = () => {
    if (document.getElementById('btnradio1').checked) {
      setLimit(document.getElementById('btnradio1').value);
    }
    if (document.getElementById('btnradio2').checked) {
      setLimit(document.getElementById('btnradio2').value);
    }
    if (document.getElementById('btnradio3').checked) {
      setLimit(document.getElementById('btnradio3').value);
    }

    setTotalPages(Math.ceil(suppliers.length / parseInt(limit)));
  };

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
    };

    useEffect(() => {
      let query = search.toLowerCase();
      setSearchUsers(users.filter(user => user.id.toString().toLowerCase().indexOf(query) >= 0 ||
        user.userName.toLowerCase().indexOf(query) >= 0 ||
        user.displayName.toLowerCase().indexOf(query) >= 0 ||
        user.roles.roleName.toLowerCase().indexOf(query) >= 0));
    }, [users, search]);
  
    useEffect(() => {
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = Math.min(startIndex + parseInt(limit), searchUsers.length);
      setLimitedUsers(searchUsers.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(searchUsers.length / parseInt(limit)));
    }, [searchUsers, limit, page]);

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
            <div className="row">
              <div className="col">
                {decodedToken["Create User"] && (
                    <div className="mb-3">
                        <Link to="/user/create" className="btn btn-primary">
                            Create new
                        </Link>
                    </div>
                )}
              </div>
              <div className="col">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" value={search} type="search" placeholder="Search" aria-label="Search" onChange={(e) => {setSearch(e.target.value); 
                    queryParams.set("search", e.target.value);
                    history.replaceState(null, null, "?" + queryParams.toString());}}/>
                </form>
              </div>
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
                    {limitedUsers.map((user) => (
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

            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{ float: "right", marginTop: "20px" }}>
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value={"10"} defaultChecked onChange={handleRadioChange} />
              <label className="btn btn-outline-secondary" htmlFor="btnradio1">10</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value={"30"} onChange={handleRadioChange} />
              <label className="btn btn-outline-secondary" htmlFor="btnradio2">30</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" value={"50"} onChange={handleRadioChange} />
              <label className="btn btn-outline-secondary" htmlFor="btnradio3">50</label>
            </div>

            <div className="btn-group" role="group" aria-label="Basic outlined example" style={{ marginLeft: "auto", marginRight: "auto", left: "50%", marginTop: "20px" }}>
              <button type="button" className="btn btn-outline-primary" disabled={page === "1"} onClick={() => {
                setPage((parseInt(page) - 1).toString());
                queryParams.set("page", (parseInt(page) + 1).toString());
                history.replaceState(null, null, "?" + queryParams.toString());
              }}>Previous</button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} type="button" className={'btn btn-outline-primary ' + (page === (i + 1).toString() ? 'active' : '')} onClick={() => {
                  setPage((i + 1).toString());
                  queryParams.set("page", (i + 1).toString());
                  history.replaceState(null, null, "?" + queryParams.toString());
                }}>{i + 1}</button>
              ))}

              <button type="button" disabled={page === totalPages.toString()} className="btn btn-outline-primary" onClick={() => {
                setPage((parseInt(page) + 1).toString());
                queryParams.set("page", (parseInt(page) + 1).toString());
                history.replaceState(null, null, "?" + queryParams.toString());
              }}>Next</button>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ShowUser;
