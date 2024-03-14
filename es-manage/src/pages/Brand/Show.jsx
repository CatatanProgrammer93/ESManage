import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowBrand() {
  var queryParams = new URLSearchParams(window.location.search);
  queryParams.set("page", "1");
  const [search, setSearch] = useState(queryParams.get("search"));
  queryParams.set("search", search);
  history.replaceState(null, null, "?" + queryParams.toString());
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const deleteBrand = (id) => {
    fetch(`https://localhost:7240/api/brand/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Use the token from local storage
      },
    }).then(() => {
      setBrands(brands.filter((brand) => brand.id !== id));
    });
  };

  useEffect(() => {
      let newSearch = "";
      if(search != ""){
        newSearch = search.replace(" ", "%");
      }
      fetch("https://localhost:7240/api/brand/search/%" + newSearch + "%/15/1", {
          headers: {
              Authorization: `Bearer ${getToken()}`, // Use the token from local storage
          },
      })
          .then((res) => res.json())
          .then((data) => setBrands(data));
  }, [search]);

    useEffect(() => {
        if (!decodedToken["Show Brand"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Brand</h2>
      
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            
            <div className="row">
              <div className="col">
                {decodedToken["Create Brand"] && (
                  <div className="mb-3">
                      <Link to="/brand/create" className="btn btn-primary">
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
                      <th>Brand Name</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((brand) => (
                      <tr key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.name}</td>
                        <td>
                          {decodedToken["Edit Brand"] && (
                            <Link
                                to={`/brand/edit/${brand.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )} 

                          {decodedToken["Delete Brand"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteBrand(brand.id)}
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

export default ShowBrand;
