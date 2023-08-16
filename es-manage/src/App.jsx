import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import CreateItemDepartment from './ItemDepartment/Create';
import EditItemDepartment from './ItemDepartment/Edit';
import CreateBrand from './Brand/Create'; // Import missing Brand components
import EditBrand from './Brand/Edit';
import CreateItem from './Item/Create'; // Import missing Item components
import EditItem from './Item/Edit';
import CreateSupplier from './Supplier/Create'; // Import Supplier components
import EditSupplier from './Supplier/Edit'; // Import Supplier components
import CreateItemSupplier from './ItemSupplier/Create'; // Import ItemSupplier components
import EditItemSupplier from './ItemSupplier/Edit'; // Import ItemSupplier components
import CreateItemSupplierTransaction from './ItemSupplierTransaction/Create'; // Import ItemSupplierTransaction components
import EditItemSupplierTransaction from './ItemSupplierTransaction/Edit'; // Import ItemSupplierTransaction components

// The RedirectToLogin component
function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
}

// The main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/item-department/create" element={<CreateItemDepartment />} />
          <Route path="/item-department/edit/:id/:categoryName" element={<EditItemDepartment />} />
          <Route path="/brand/create" element={<CreateBrand />} />
          <Route path="/brand/edit/:id" element={<EditBrand />} />
          <Route path="/item/create" element={<CreateItem />} />
          <Route path="/item/edit/:id" element={<EditItem />} />
          <Route path="/supplier/create" element={<CreateSupplier />} />
          <Route path="/supplier/edit/:id" element={<EditSupplier />} />
          <Route path="/item-supplier/create" element={<CreateItemSupplier />} />
          <Route path="/item-supplier/edit/:id" element={<EditItemSupplier />} />
          <Route path="/item-supplier-transaction/create" element={<CreateItemSupplierTransaction />} />
          <Route path="/item-supplier-transaction/edit/:id" element={<EditItemSupplierTransaction />} />
          <Route path="*" element={<RedirectToLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
