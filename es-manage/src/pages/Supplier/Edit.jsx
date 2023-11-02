import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import dashboard from "../../assets/dashboard.svg";
import alert from "../../assets/alert.svg";
import asset from "../../assets/asset.svg";
import recent from "../../assets/recent.svg";
import setting from "../../assets/setting.svg";
import "../../App.css";

function EditSupplier() {
  const { id: urlId } = useParams();
  const [id, setId] = useState(urlId);
  const [supplierName, setSupplierName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7240/api/supplier/${id}`
      );
      setId(response.data.id);
      setSupplierName(response.data.supplierName);
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`https://localhost:7240/api/supplier/${id}`, {
        id: id,
        supplierName: supplierName,
        createdBy: createdBy,
      });
      navigate("/supplier");
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-quaternary h-screen">
      <div className="bg-quinary w-64 h-screen">
        <img src={logo} alt="logo" className="w-20 ml-20 pt-10 max-md:w-16" />
        <nav className="flex flex-col gap-10 p-12">
          <ul className="">
            <Link to="/dashboard">
              <li className="inline-flex items-center py-6">
                <img src={dashboard} alt="dashboard" className="w-8" />
                <span className="text-white font-medium ml-2">Dashboard</span>
              </li>
            </Link>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={alert} alt="alert" className="w-8" />
              <span className="text-white font-medium ml-2 ">Alerts</span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={asset} alt="asset" className="w-8" />
              <span className="text-white font-medium ml-2 ">Assets</span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={recent} alt="recent" className="w-8" />
              <span className="text-white font-medium ml-2 ">
                Recent Activities
              </span>
            </li>
            <br />
            <li className="inline-flex items-center py-6">
              <img src={setting} alt="setting" className="w-8" />
              <span className="text-white font-medium ml-2 ">Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <div className="absolute top-2 left-96 text-white">
          <h1 className="text-3xl font-bold mt-20 mb-10">Edit Supplier</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-md font-semibold">ID</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="text"
              value={id}
              readOnly
              placeholder="ID is Read Only"
            />
            <br />
            <label className="text-md font-semibold">Supplier Name</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="Type the supplier name"
            />
            <br />
            <br />
            <button
              className="btn text-quaternary font-semibold"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditSupplier;
