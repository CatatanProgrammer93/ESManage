// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AppLayout from "../../layouts/AppLayout";
// import { jwtDecode } from "jwt-decode";

// function ShowSupplier() {
//   var queryParams = new URLSearchParams(window.location.search);
//   const [search, setSearch] = useState(queryParams.get("search") || "");
//   const [page, setPage] = useState(queryParams.get("page") || "1");
//   queryParams.set("search", search);
//   queryParams.set("page", page);
//   history.replaceState(null, null, "?" + queryParams.toString());
//   const [limit, setLimit] = useState("10");
//   const [totalPages, setTotalPages] = useState(1);
//   const [reports, setReports] = useState([]);
//   const [brands, setBrands] = useState({});
//   const [stoks, setStoks] = useState([]);
//   const [limitedReports, setLimitedReports] = useState([]);
//   const [searchReports, setSearchReports] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const navigate = useNavigate();

//   // Function to get the token from local storage
//   const getToken = () => {
//     return localStorage.getItem("token");
//   };
//   const decodedToken = jwtDecode(getToken());

//   const deleteSupplier = (id) => {
//     fetch(`https://localhost:7240/api/supplier/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${getToken()}`, // Include the token from local storage
//       },
//     }).then(() => {
//       setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
//     });
//   };

//   useEffect(() => {
//     // Fetch Supplier
//     fetch("https://localhost:7240/api/supplier", {
//       headers: {
//         Authorization: `Bearer ${getToken()}`, // Include the token from local storage
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setSuppliers(data));
//   }, []);


//   useEffect(() => {
//     let query = search.toLowerCase();
//     setSearchReports(reports.filter(report => report.id.indexOf(query) >= 0 || 
//     report.type.toLowerCase().indexOf(query) >= 0 ||
//     report.tableName.toLowerCase().indexOf(query) >= 0));
//   }, [reports, search]);

//   useEffect(() => {
//     const startIndex = (parseInt(page) - 1) * parseInt(limit);
//     const endIndex = Math.min(startIndex + parseInt(limit), searchReports.length);
//     setLimitedReports(searchReports.slice(startIndex, endIndex));
//     setTotalPages(Math.ceil(searchReports.length/parseInt(limit)));
//   }, [searchReports, limit, page]);

//     useEffect(() => {
//         if (!decodedToken["Show Supplier"]) {
//             navigate("/dashboard");
//         }
//     }, []);

//   return (
// <AppLayout>
//   <h2 className="page-title">Supplier</h2>
//   <div className="card mt-3">
//     <div className="card-body">
//       <div className="col-12">
//         {decodedToken["Create Supplier"] && (
//             <div className="mb-3">
//                 <Link to="/supplier/create" className="btn btn-primary">
//                     Create new
//                 </Link>
//             </div>
//         )}

//         <div className="card">
//           <div className="table-responsive">
//             <table className="table table-vcenter card-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Supplier Name</th>
//                   <th>Action</th>
//                   <th className="w-1"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {suppliers.map((supplier) => (
//                   <tr key={supplier.id}>
//                     <td>{supplier.id}</td>
//                     <td>{supplier.supplierName}</td>
//                     <td>
//                       {decodedToken["Edit Supplier"] && (
//                         <Link
//                             to={`/supplier/edit/${supplier.id}`}
//                             className="btn btn-primary"
//                         >
//                             Edit
//                         </Link>
//                       )}

//                       {decodedToken["Delete Supplier"] && (
//                         <button
//                             className="btn btn-danger mx-2"
//                             onClick={() => deleteSupplier(supplier.id)}
//                         >
//                             Delete
//                         </button>
//                           )}

//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

// export default ShowSupplier;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowSupplier() {
  var queryParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(queryParams.get("search") || "");
  const [page, setPage] = useState(queryParams.get("page") || "1");
  queryParams.set("search", search);
  queryParams.set("page", page);
  history.replaceState(null, null, "?" + queryParams.toString());
  const [limit, setLimit] = useState("10");
  const [totalPages, setTotalPages] = useState(1);
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState({});
  const [stoks, setStoks] = useState([]);
  const [limitedSuppliers, setLimitedSuppliers] = useState([]);
  const [searchSuppliers, setSearchSuppliers] = useState([]);
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

  const deleteSupplier = (id) => {
    fetch(`https://localhost:7240/api/supplier/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    }).then(() => {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    });
  };

  useEffect(() => {
    fetch("https://localhost:7240/api/brand", {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    })
      .then((res) => res.json())
      .then((brandData) => {
        const brandDict = {};
        brandData.forEach((brand) => {
          brandDict[brand.id] = brand.name;
        });
        setBrands(brandDict);
      });
  }, []); // This effect runs once on component mount

  useEffect(() => {
    const fetchStoks = async () => {
      const res = await fetch("https://localhost:7240/api/stok", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
      });
      const data = await res.json();
      setStoks(data);
    };

    fetchStoks();
  }, []);

  useEffect(() => {
    if (Object.keys(brands).length > 0) {
      fetch("https://localhost:7240/api/supplier", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
      })
        .then((res) => res.json())
        .then((supplierData) => {
          const suppliersWithBrand = supplierData.map((supplier) => {
            const stok = stoks.find((stk) => stk.supplierId === supplier.id);
            return {
              ...supplier,
              brandName: brands[supplier.brandId] || "Unknown",
              stok: stok ? stok.stok : "-",
            }
          });
          setSuppliers(suppliersWithBrand);
        });
    }
  }, [brands]);

  useEffect(() => {
    let query = search.toLowerCase();
    setSearchSuppliers(suppliers.filter(supplier => supplier.id.indexOf(query) >= 0 ||
      supplier.supplierName.indexOf(query) >= 0));
  }, [suppliers, search]);

  useEffect(() => {
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = Math.min(startIndex + parseInt(limit), searchSuppliers.length);
    setLimitedSuppliers(searchSuppliers.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(searchSuppliers.length / parseInt(limit)));
  }, [searchSuppliers, limit, page]);

  useEffect(() => {
    if (!decodedToken["Show Supplier"]) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Supplier</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            <div className="row">
              <div className="col">
                {decodedToken["Create Supplier"] && (
                  <div className="mb-3">
                    <Link to="/supplier/create" className="btn btn-primary">
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
                        <th>Supplier Name</th>
                        <th>Action</th>
                        <th className="w-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {limitedSuppliers.map((supplier) => (
                        <tr key={supplier.id}>
                          <td>{supplier.id}</td>
                          <td>{supplier.supplierName}</td>
                          <td>
                            {decodedToken["Edit Supplier"] && (
                              <Link
                                to={`/supplier/edit/${supplier.id}`}
                                className="btn btn-primary"
                              >
                                Edit
                              </Link>
                            )}

                            {decodedToken["Delete Supplier"] && (
                              <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteSupplier(supplier.id)}
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

export default ShowSupplier;
