import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import dashboard from '../assets/dashboard.svg';
import recent from '../assets/recent.svg';
import alert from '../assets/alert.svg';
import asset from '../assets/asset.svg';
import setting from '../assets/setting.svg';
import '../App.css';

function EditItemSupplierTransaction() {
  const { id: urlId } = useParams();
  const [id, setId] = useState(urlId);
  const [itemSupplierId, setItemSupplierId] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://localhost:7240/api/itemsupplier_transaction/${id}`);
      setId(response.data.id);
      setItemSupplierId(response.data.itemSupplierId);
      setTransactionType(response.data.transactionType);
      setTransactionDate(response.data.transactionDate);
      setQuantity(response.data.quantity);
      setNotes(response.data.notes);
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
      await axios.put(`https://localhost:7240/api/itemsupplier_transaction/${id}`, {
        id: id,
        itemSupplierId: itemSupplierId,
        transactionType: transactionType,
        transactionDate: transactionDate,
        quantity: quantity,
        notes: notes,
      });
      navigate('/dashboard');
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
        </nav>
      </div>
      <div className="container">
        <div className="absolute top-2 left-96 text-white">
          <h1 className="text-3xl font-bold mt-20 mb-10">Edit Item Supplier Transaction</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-md font-semibold">Item Supplier ID</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={itemSupplierId} onChange={(e) => setItemSupplierId(e.target.value)} placeholder="Item Supplier ID" />
            <br />
            <label className="text-md font-semibold">Transaction Type</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="text" value={transactionType} onChange={(e) => setTransactionType(e.target.value)} placeholder="Transaction Type" />
            <br />
            <label className="text-md font-semibold">Transaction Date</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="datetime-local" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} placeholder="Transaction Date" />
            <br />
            <label className="text-md font-semibold">Quantity</label>
            <br />
            <input className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            <br />
            <label className="text-md font-semibold">Notes</label>
            <br />
            <textarea className="input input-bordered w-full max-w-xs mb-6 mt-2 text-black" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes"></textarea>
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

export default EditItemSupplierTransaction;
