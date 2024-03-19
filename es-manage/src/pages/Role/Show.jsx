import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowRole() {
  var queryParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(queryParams.get("search") || "");
  const [page, setPage] = useState(queryParams.get("page") || "1");
  queryParams.set("search", search);
  queryParams.set("page", page);
  history.replaceState(null, null, "?" + queryParams.toString());
  const [limit, setLimit] = useState("10");
  const [totalPages, setTotalPages] = useState(1);
  const [roles, setRoles] = useState([]);
  const [limitedRoles, setLimitedRoles] = useState([]);
  const [searchRoles, setSearchRoles] = useState([]);
  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
    
  };
  const decodedToken = jwtDecode(getToken());
  const handleRadioChange = () => {
    if(document.getElementById('btnradio1').checked) {
      setLimit(document.getElementById('btnradio1').value);
    }
    if(document.getElementById('btnradio2').checked) {
      setLimit(document.getElementById('btnradio2').value);
    }
    if(document.getElementById('btnradio3').checked) {
      setLimit(document.getElementById('btnradio3').value);
    }

    setTotalPages(Math.ceil(itemsuppliertransactions.length/parseInt(limit)));
  };
 


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
    let query = search.toLowerCase();
    setSearchRoles(roles.filter(role => role.id.indexOf(query) >= 0 || 
    role.roleName.toLowerCase().indexOf(query) >= 0));
  }, [roles, search]);

  useEffect(() => {
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = Math.min(startIndex + parseInt(limit), searchRoles.length);
    setLimitedRoles(searchRoles.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(searchRoles.length/parseInt(limit)));
  }, [searchRoles, limit, page]);

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
            <div className="row">
              <div className="col">
              {decodedToken["Create Role"] && (
                <div className="mb-3">
                    <Link to="/role/create" className="btn btn-primary">
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
                      <th>RoleName</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {limitedRoles.map((role) => (
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

            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{float:"right", marginTop:"20px"}}>
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value={"10"} defaultChecked onChange={handleRadioChange}/>
              <label className="btn btn-outline-secondary" htmlFor="btnradio1">10</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value={"30"} onChange={handleRadioChange}/>
              <label className="btn btn-outline-secondary" htmlFor="btnradio2">30</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" value={"50"} onChange={handleRadioChange}/>
              <label className="btn btn-outline-secondary" htmlFor="btnradio3">50</label>
            </div>

            <div className="btn-group" role="group" aria-label="Basic outlined example" style={{marginLeft:"auto", marginRight:"auto", left:"50%", marginTop:"20px"}}>
              <button type="button" className="btn btn-outline-primary" disabled={page === "1"} onClick={() => {
                setPage((parseInt(page) - 1).toString());
                queryParams.set("page", (parseInt(page) + 1).toString());
                history.replaceState(null, null, "?" + queryParams.toString());
              }}>Previous</button>

              {Array.from({length: totalPages}, (_, i) => (
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

export default ShowRole;
