import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import recent from "../assets/recent.svg";
import alert from "../assets/alert.svg";
import asset from "../assets/asset.svg";
import setting from "../assets/setting.svg";
import "../App.css";

function EditBrand() {
  const { id } = useParams(); // Extracting the 'id' parameter
  const navigate = useNavigate(); // Create an instance of useNavigate

  const [brand, setBrand] = useState({
    id: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7240/api/brand/${id}`
      );
      setBrand(response.data); // Update the state with the received data
    } catch (error) {
      console.error(error);
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
      const response = await axios.put(
        `https://localhost:7240/api/brand/${id}`,
        brand
      );
      console.log(response.data);

      // Redirect to the desired page after successfully updating
      navigate("/brand"); // Update this with the correct path
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-quaternary h-[200vh]">
      <div className="bg-quinary w-64 h-[200vh]">
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
          <h1 className="text-3xl font-bold mt-20 mb-10">Edit Brand</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-md font-semibold">ID</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="text"
              value={brand.id}
              onChange={(e) => setBrand({ ...brand, id: e.target.value })}
              placeholder="Type the ID"
            />
            <br />
            <label className="text-md font-semibold">Brand Name</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="text"
              value={brand.name}
              onChange={(e) => setBrand({ ...brand, name: e.target.value })}
              placeholder="Type the brand name"
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

export default EditBrand;
