import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";

function ShowItem() {
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState({});
  const [stoks, setStoks] = useState([]);
  const navigate = useNavigate();

  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  const deleteItem = (id) => {
    fetch(`https://localhost:7240/api/item/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token from local storage
      },
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
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
      fetch("https://localhost:7240/api/item", {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include the token from local storage
        },
      })
        .then((res) => res.json())
        .then((itemData) => {
          const itemsWithBrand = itemData.map((item) => {
            const stok = stoks.find((stk) => stk.itemId === item.id);
            return{
              ...item,
              brandName: brands[item.brandId] || "Unknown",
              stok: stok ? stok.stok: "-",
            }
          });
          setItems(itemsWithBrand);
        });
    }
  }, [brands]);

    useEffect(() => {
        if (!decodedToken["Show Item"]) {
            navigate("/dashboard");
        }
    }, []);

  return (
    <AppLayout>
      <h2 className="page-title">Item</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">
            {decodedToken["Create Item"] && (
                <div className="mb-3">
                    <Link to="/item/create" className="btn btn-primary">
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
                      <th>Item Name</th>
                      <th>Category Name</th>
                      <th>Brand Name</th>
                      <th>Stok</th>
                      <th>Action</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.itemName}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.brandName}</td>
                        <td>{item.stok}</td>
                        <td>
                          {decodedToken["Edit Item"] && (
                            <Link
                                to={`/item/edit/${item.id}`}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                          )}

                          {decodedToken["Delete Item"] && (
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => deleteItem(item.id)}
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

export default ShowItem;
