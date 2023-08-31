import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import dashboard from './assets/dashboard.svg';
import recent from './assets/recent.svg';
import alert from './assets/alert.svg';
import asset from './assets/asset.svg';
import userIcon from './assets/user.svg';
import setting from './assets/setting.svg';
import './App.css';

function Dashboard() {
  const [departments, setDepartments] = useState([]);
  const [brands, setBrands] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [itemsuppliers, setItemSuppliers] = useState([]);
  const location = useLocation();
  const userFromState = location.state ? location.state.user : null;
  const userFromStorageItem = localStorage.getItem('user');
  let userFromStorage = null;
  try {
    if (userFromStorageItem && userFromStorageItem !== 'undefined') {
      userFromStorage = JSON.parse(userFromStorageItem);
    }
  } catch (e) {
    console.error(e);
    // handle parsing error if necessary
  }

  const user = userFromState || userFromStorage;
  const displayName = user ? user.displayName : 'Guest';

  const deleteDepartment = (id, categoryName) => {
    fetch(`https://localhost:7240/api/itemdepartment/${id}/${categoryName}`, {
      method: 'DELETE',
    }).then(() => {
      setDepartments(departments.filter((department) => department.id !== id));
    });
  };

  const deleteBrand = (id) => {
    fetch(`https://localhost:7240/api/brand/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setBrands(brands.filter((brand) => brand.id !== id));
    });
  };

  const deleteItem = (id) => {
    fetch(`https://localhost:7240/api/item/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const deleteSupplier = (id) => {
    fetch(`https://localhost:7240/api/supplier/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    });
  };

  const deleteItemSupplier = (id) => {
    fetch(`https://localhost:7240/api/itemsupplier/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setItemSuppliers(itemsuppliers.filter((itemsupplier) => itemsupplier.id !== id));
    });
  };

  useEffect(() => {
    // Fetch Item Departments
    fetch('https://localhost:7240/api/itemdepartment')
      .then((res) => res.json())
      .then((data) => setDepartments(data));

    // Fetch Brands
    fetch('https://localhost:7240/api/brand')
      .then((res) => res.json())
      .then((data) => setBrands(data));

    // Fetch Items
    fetch('https://localhost:7240/api/item')
      .then((res) => res.json())
      .then((data) => setItems(data));

    // Fetch Supplier
    fetch('https://localhost:7240/api/supplier')
      .then((res) => res.json())
      .then((data) => setSuppliers(data));

    // Fetch ItemsSupplier
    fetch('https://localhost:7240/api/itemsupplier')
      .then((res) => res.json())
      .then((data) => setItemSuppliers(data));
  }, []);

  return (
    <div className="bg-quaternary h-[400vh]">
      <div className="bg-quinary w-64 h-[400vh]">
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
        <div className="absolute top-2 left-96">
          <div className="mt-16 inline-flex items-center">
            <form action="">
              <input type="text" className="bg-white text- text-lg text-black bg-transparent border-none rounded-xl py-3 px-8 w-[50rem] mr-32" placeholder="Search" />
            </form>
            <span className="text-white font-semibold text-xl mx-4">{displayName}</span>
            <img src={userIcon} alt="user" className="w-[52px]" />
          </div>
          <div className="mt-20 ml-96">
            <h1 className="text-white font-bold text-4xl">Hi, {displayName}!</h1>
          </div>

          {/* Item Department table */}
          <div className="overflow-x-auto mt-20">
            <h1 className="text-white mb-4 font-bold text-2xl">Item Department</h1>
            <Link to="/item-department/create">
              <button className="btn text-quaternary font-semibold mb-5">Create new</button>
            </Link>
            <table className="table">
              <thead className="text-white text-lg">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Parent ID</th>
                  <th></th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-white text-lg">
                {departments.map((department, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{department.categoryName}</td>
                    <th>{department.itemDepartmentParentId}</th>
                    <th></th>
                    <th></th>
                    <td>
                      <Link to={`/item-department/edit/${department.id}/${department.categoryName}`}>
                        <button className="btn text-quaternary font-semibold mr-2">Edit</button>
                      </Link>
                      <button className="btn bg-red-700 text-white font-semibold border-none" onClick={() => deleteDepartment(department.id, department.categoryName)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Brand Table */}
          <div className="overflow-x-auto mt-20">
            <h1 className="text-white mb-4 font-bold text-2xl">Brand</h1>
            <Link to="/brand/create">
              <button className="btn text-quaternary font-semibold mb-5">Create new</button>
            </Link>
            <table className="table">
              <thead className="text-white text-lg">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-white text-lg">
                {brands.map((brand, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{brand.name}</td>
                    <th></th>
                    <th></th>
                    <th></th>
                    <td>
                      <Link to={`/brand/edit/${brand.id}`}>
                        <button className="btn text-quaternary font-semibold mr-2">Edit</button>
                      </Link>
                      <button className="btn bg-red-700 text-white font-semibold border-none" onClick={() => deleteBrand(brand.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Item Table */}
          <div className="overflow-x-auto mt-20">
            <h1 className="text-white mb-4 font-bold text-2xl">Item</h1>
            <Link to="/item/create">
              <button className="btn text-quaternary font-semibold mb-5">Create new</button>
            </Link>
            <table className="table">
              <thead className="text-white text-lg">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-white text-lg">
                {items.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.itemName}</td>
                    <th></th>
                    <th></th>
                    <th></th>
                    <td>
                      <Link to={`/item/edit/${item.id}`}>
                        <button className="btn text-quaternary font-semibold mr-2">Edit</button>
                      </Link>
                      <button className="btn bg-red-700 text-white font-semibold border-none" onClick={() => deleteItem(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Supplier */}
          <div className="overflow-x-auto mt-20">
            <h1 className="text-white mb-4 font-bold text-2xl">Supplier</h1>
            <Link to="/supplier/create">
              <button className="btn text-quaternary font-semibold mb-5">Create new</button>
            </Link>
            <table className="table">
              <thead className="text-white text-lg">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-white text-lg">
                {suppliers.map((supplier, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{supplier.supplierName}</td>
                    <th></th>
                    <th></th>
                    <th></th>
                    <td>
                      <Link to={`/supplier/edit/${supplier.id}`}>
                        <button className="btn text-quaternary font-semibold mr-2">Edit</button>
                      </Link>
                      <button className="btn bg-red-700 text-white font-semibold border-none" onClick={() => deleteSupplier(supplier.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Item Supplier */}
          <div className="overflow-x-auto mt-20">
            <h1 className="text-white mb-4 font-bold text-2xl">Item Supplier</h1>
            <Link to="/item-supplier/create">
              <button className="btn text-quaternary font-semibold mb-5">Create new</button>
            </Link>
            <table className="table">
              <thead className="text-white text-lg">
                <tr>
                  <th></th>
                  <th>Item ID</th>
                  <th>Supplier ID</th>
                  <th></th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-white text-lg">
                {itemsuppliers.map((itemsupplier, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{itemsupplier.itemId}</td>
                    <th>{itemsupplier.supplierId}</th>
                    <th></th>
                    <th></th>
                    <td>
                      <Link to={`/item-supplier/edit/${itemsupplier.id}`}>
                        <button className="btn text-quaternary font-semibold mr-2">Edit</button>
                      </Link>
                      <button className="btn bg-red-700 text-white font-semibold border-none" onClick={() => deleteItemSupplier(itemsupplier.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Item Supplier Transaction */}
          <div className="overflow-x-auto mt-20">
            <h1 className="text-white mb-4 font-bold text-2xl">Item Supplier Transaction</h1>
            <Link to="/item/create">
              <button className="btn text-quaternary font-semibold mb-5">Create new</button>
            </Link>
            <table className="table">
              <thead className="text-white text-lg">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-white text-lg">
                {items.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.itemName}</td>
                    <th></th>
                    <th></th>
                    <th></th>
                    <td>
                      <Link to={`/item/edit/${item.id}`}>
                        <button className="btn text-quaternary font-semibold mr-2">Edit</button>
                      </Link>
                      <button className="btn bg-red-700 text-white font-semibold border-none" onClick={() => deleteItem(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
