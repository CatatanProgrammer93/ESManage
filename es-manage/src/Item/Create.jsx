import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import search from '../assets/search.svg';
import dashboard from '../assets/dashboard.svg';
import recent from '../assets/recent.svg';
import alert from '../assets/alert.svg';
import asset from '../assets/asset.svg';
import userIcon from '../assets/user.svg';
import setting from '../assets/setting.svg';
import '../App.css';

function CreateItem() {
  const [id, setId] = useState('');
  const [itemName, setItemName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [uom, setUom] = useState('');
  const [taxType, setTaxType] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [minimumRetailPrice, setMinimumRetailPrice] = useState(0);
  const [balanceQty, setBalanceQty] = useState(0);
  const [avgCostPrice, setAvgCostPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [createdBy, setCreatedBy] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let axiosConfig = {
        method: 'POST',
        url: 'https://localhost:7240/api/item',
        data: {
          id,
          itemName,
          categoryId,
          categoryName,
          brandId,
          uom,
          taxType,
          taxRate,
          minimumRetailPrice,
          balanceQty,
          avgCostPrice,
          retailPrice,
          costPrice,
          createdBy,
        },
      };
      let response = await axios(axiosConfig);
      // Resetting all the fields
      setItemName('');
      setCategoryId('');
      setCategoryName('');
      setBrandId('');
      setUom('');
      setTaxType(0);
      setTaxRate(0);
      setMinimumRetailPrice(0);
      setBalanceQty(0);
      setAvgCostPrice(0);
      setRetailPrice(0);
      setCostPrice(0);
      navigate('/dashboard');
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
          <h1 className="text-3xl font-bold mt-20 mb-10">Create Item</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-md font-semibold">Item Name</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Type the item name" />
            <br />
            <label className="text-md font-semibold">Category ID</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Type the category ID" />
            <br />
            <label className="text-md font-semibold">Category Name</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Type the category name" />
            <br />
            <label className="text-md font-semibold">Brand ID</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={brandId} onChange={(e) => setBrandId(e.target.value)} placeholder="Type the brand ID" />
            <br />
            <label className="text-md font-semibold">Unit of Measure (UOM)</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={uom} onChange={(e) => setUom(e.target.value)} placeholder="Type the UOM" />
            <br />
            <label className="text-md font-semibold">Tax Type</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={taxType} onChange={(e) => setTaxType(e.target.value)} placeholder="Type the tax type" />
            <br />
            <label className="text-md font-semibold">Tax Rate</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="Type the tax rate" />
            <br />
            <label className="text-md font-semibold">Minimum Retail Price</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={minimumRetailPrice} onChange={(e) => setMinimumRetailPrice(e.target.value)} placeholder="Type the minimum retail price" />
            <br />
            <label className="text-md font-semibold">Balance Quantity</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={balanceQty} onChange={(e) => setBalanceQty(e.target.value)} placeholder="Type the balance quantity" />
            <br />
            <label className="text-md font-semibold">Average Cost Price</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={avgCostPrice} onChange={(e) => setAvgCostPrice(e.target.value)} placeholder="Type the average cost price" />
            <br />
            <label className="text-md font-semibold">Retail Price</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} placeholder="Type the retail price" />
            <br />
            <label className="text-md font-semibold">Cost Price</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="Type the cost price" />
            <br />
            <button className="btn text-quaternary font-semibold" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default CreateItem;
