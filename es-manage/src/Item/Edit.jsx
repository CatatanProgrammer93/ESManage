import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo.svg';
import search from '../assets/search.svg';
import dashboard from '../assets/dashboard.svg';
import recent from '../assets/recent.svg';
import alert from '../assets/alert.svg';
import asset from '../assets/asset.svg';
import userIcon from '../assets/user.svg';
import setting from '../assets/setting.svg';
import '../App.css';

function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState({
    itemName: '',
    categoryId: '',
    categoryName: '',
    brandId: '',
    uom: '',
    taxType: 0,
    taxRate: 0,
    minimumRetailPrice: 0,
    balanceQty: 0,
    avgCostPrice: 0,
    retailPrice: 0,
    costPrice: 0,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://localhost:7240/api/item/${id}`);
      setItem(response.data);
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
      const response = await axios.put(`https://localhost:7240/api/item/${id}`, item);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-quaternary h-[230vh]">
      <div className="bg-quinary w-64 h-[230vh]">
        <img src={logo} alt="logo" className="w-20 ml-20 pt-10 max-md:w-16" />
        <nav className="flex flex-col gap-10 p-12">
          <ul className="">
            <li className="inline-flex items-center py-6">
              <img src={dashboard} alt="dashboard" className="w-8" />
              <span className="text-white font-medium ml-2">Dashboard</span>
            </li>
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
              <span className="text-white font-medium ml-2 ">Recent Activities</span>
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
          <h1 className="text-3xl font-bold mt-20 mb-10">Edit Item</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-md font-semibold">Item Name</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={item.itemName} onChange={(e) => setItem({ ...item, itemName: e.target.value })} placeholder="Type the item name" />
            <br />
            <label className="text-md font-semibold">Category ID</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={item.categoryId} onChange={(e) => setItem({ ...item, categoryId: e.target.value })} placeholder="Type the category ID" />
            <br />
            <label className="text-md font-semibold">Category Name</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={item.categoryName} onChange={(e) => setItem({ ...item, categoryName: e.target.value })} placeholder="Type the category name" />
            <br />
            <label className="text-md font-semibold">Brand ID</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={item.brandId} onChange={(e) => setItem({ ...item, brandId: e.target.value })} placeholder="Type the brand ID" />
            <br />
            <label className="text-md font-semibold">Unit of Measure (UOM)</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={item.uom} onChange={(e) => setItem({ ...item, uom: e.target.value })} placeholder="Type the UOM" />
            <br />
            <label className="text-md font-semibold">Tax Type</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={item.taxType} onChange={(e) => setItem({ ...item, taxType: parseInt(e.target.value, 10) })} placeholder="Type the tax type" />
            <br />
            <label className="text-md font-semibold">Tax Rate</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={item.taxRate} onChange={(e) => setItem({ ...item, taxRate: parseFloat(e.target.value) })} placeholder="Type the tax rate" />
            <br />
            <label className="text-md font-semibold">Minimum Retail Price</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="number"
              value={item.minimumRetailPrice}
              onChange={(e) => setItem({ ...item, minimumRetailPrice: parseFloat(e.target.value) })}
              placeholder="Type the minimum retail price"
            />
            <br />
            <label className="text-md font-semibold">Balance Quantity</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="number"
              value={item.balanceQty}
              onChange={(e) => setItem({ ...item, balanceQty: parseInt(e.target.value, 10) })}
              placeholder="Type the balance quantity"
            />
            <br />
            <label className="text-md font-semibold">Average Cost Price</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="number"
              value={item.avgCostPrice}
              onChange={(e) => setItem({ ...item, avgCostPrice: parseFloat(e.target.value) })}
              placeholder="Type the average cost price"
            />
            <br />
            <label className="text-md font-semibold">Retail Price</label>
            <br />
            <input
              className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black"
              type="number"
              value={item.retailPrice}
              onChange={(e) => setItem({ ...item, retailPrice: parseFloat(e.target.value) })}
              placeholder="Type the retail price"
            />
            <br />
            <label className="text-md font-semibold">Cost Price</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={item.costPrice} onChange={(e) => setItem({ ...item, costPrice: parseFloat(e.target.value) })} placeholder="Type the cost price" />
            <br />
            <button className="btn text-quaternary font-semibold" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditItem;
