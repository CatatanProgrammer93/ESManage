import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowItemDepartment() {
  var queryParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(queryParams.get("search") || "");
  const [page, setPage] = useState(queryParams.get("page") || "1");
  queryParams.set("search", search);
  queryParams.set("page", page);
  history.replaceState(null, null, "?" + queryParams.toString());
  const [limit, setLimit] = useState("10");
  const [totalPages, setTotalPages] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [limitedDepartments, setLimitedDepartments] = useState([]);
  const [searchDepartments, setSearchDepartments] = useState([]);
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

    setTotalPages(Math.ceil(departments.length/parseInt(limit)));
  };


  const deleteDepartment = (id, categoryName) => {
    fetch(`https://localhost:7240/api/itemdepartment/${id}/${categoryName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    }).then(() => {
      setDepartments(departments.filter((department) => department.id !== id));
    });
  };

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

  useEffect(() => {
    let query = search.toLowerCase();
    setSearchDepartments(departments.filter(department => department.id.indexOf(query) >= 0 || 
    department.categoryName.toLowerCase().indexOf(query) >= 0 ));
  }, [departments, search]);

  useEffect(() => {
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = Math.min(startIndex + parseInt(limit), searchDepartments.length);
    setLimitedDepartments(searchDepartments.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(searchDepartments.length/parseInt(limit)));
  }, [searchDepartments, limit, page]);


    useEffect(() => {
        if (!decodedToken["Show Category"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Category</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
          
            <div className="row">
              <div className="col">
            {decodedToken["Create Category"] && (
                <div className="mb-3">
                    <Link to="/item-department/create" className="btn btn-primary">
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
                      <th>Category Name</th>
                    <th>Item Department</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {limitedDepartments.map((department) => (
                      <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.categoryName}</td>
                        <td>{departments.find(dep => dep.id === department.itemDepartmentParentId)?.categoryName || 'N/A'}</td>
                        <td>
                          {decodedToken["Edit Category"] && (
                            <Link
                                to={`/item-department/edit/${department.id}/${department.categoryName}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )}

                          {decodedToken["Delete Category"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() =>
                                    deleteDepartment(
                                        department.id,
                                        department.categoryName
                                    )
                                }
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

export default ShowItemDepartment;
