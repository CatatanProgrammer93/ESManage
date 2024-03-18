import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowItemSupplier() {
  var queryParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(queryParams.get("search") || "");
  const [page, setPage] = useState(queryParams.get("page") || "1");
  queryParams.set("search", search);
  queryParams.set("page", page);
  history.replaceState(null, null, "?" + queryParams.toString());
  const [limit, setLimit] = useState("10");
  const [totalPages, setTotalPages] = useState(1);
  const [itemsuppliers, setItemSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [limitedItemSuppliers, setLimitedSuppliers] = useState([]);
  const [searchItemSuppliers, setSearchItemSuppliers] = useState([]);
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

    setTotalPages(Math.ceil(suppliers.length/parseInt(limit)));
  };


  function deleteItemSupplier(id) {
    fetch(`https://localhost:7240/api/itemsupplier/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    })
      .then((res) => res.json())
      .then(() => {
        const updatedItemSuppliers = itemsuppliers.filter((is) => is.id !== id);
        setItemSuppliers(updatedItemSuppliers);
      })
      .catch((error) => {
        console.error("Error deleting item supplier:", error);
      });
  }

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("https://localhost:7240/api/item", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
      });
      const data = await res.json();
      setItems(data);
    };

    const fetchSuppliers = async () => {
      const res = await fetch("https://localhost:7240/api/supplier", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
      });
      const data = await res.json();
      setSuppliers(data);
    };

    fetchItems();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetch("https://localhost:7240/api/itemsupplier", {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    })
      .then((res) => res.json())
      .then((itemsupplierData) => {
        const enrichedData = itemsupplierData.map((is) => {
          const item = items.find((item) => item.id === is.itemId);
          const supplier = suppliers.find((sup) => sup.id === is.supplierId);
          return {
            ...is,
            itemName: item ? item.itemName : "Unknown Item",
            supplierName: supplier ? supplier.supplierName : "Unknown Supplier",
          };
        });
        setItemSuppliers(enrichedData);
      });
  }, [items, suppliers]);

  useEffect(() => {
    let query = search.toLowerCase();
    setSearchItemSuppliers(itemsuppliers.filter(itemsupplier => itemsupplier.id.indexOf(query) >= 0 || 
    itemsupplier.itemName.toLowerCase().indexOf(query) >= 0 ||
    itemsupplier.supplierName.toLowerCase().indexOf(query) >= 0));
  }, [itemsuppliers, search]);

  useEffect(() => {
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = Math.min(startIndex + parseInt(limit), searchItemSuppliers.length);
    setLimitedSuppliers(searchItemSuppliers.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(searchItemSuppliers.length/parseInt(limit)));
  }, [searchItemSuppliers, limit, page]);

    useEffect(() => {
        if (!decodedToken["Show Item Supplier"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Item Supplier</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">

          <div className="row">
              <div className="col">
            {decodedToken["Create Item Supplier"] && (
                <div className="mb-3">
                    <Link to="/item-supplier/create" className="btn btn-primary">
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
                      <th>Item Name</th>
                      <th>Supplier Name</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {limitedItemSuppliers.map((itemsupplier) => (
                      <tr key={itemsupplier.id}>
                        <td>{itemsupplier.id}</td>
                        <td>{itemsupplier.itemName}</td>
                        <td>{itemsupplier.supplierName}</td>
                        <td>
                          {decodedToken["Edit Item Supplier"] && (
                            <Link
                                to={`/item-supplier/edit/${itemsupplier.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )}

                          {decodedToken["Delete Item Supplier"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteItemSupplier(
                                  itemsupplier.id)}
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

export default ShowItemSupplier;
