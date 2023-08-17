import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ShowItemDepartment from './ItemDepartment/Show';
import CreateItemDepartment from './ItemDepartment/Create';
import EditItemDepartment from './ItemDepartment/Edit';
import ShowBrand from './Brand/Show';
import CreateBrand from './Brand/Create'; 
import EditBrand from './Brand/Edit';
import ShowItem from './Item/Show';
import CreateItem from './Item/Create'; 
import EditItem from './Item/Edit';
import ShowSupplier from './Supplier/Show';
import CreateSupplier from './Supplier/Create'; 
import EditSupplier from './Supplier/Edit'; 
import ShowItemSupplier from './ItemSupplier/Show';
import CreateItemSupplier from './ItemSupplier/Create'; 
import EditItemSupplier from './ItemSupplier/Edit'; 
import ShowItemSupplierTransaction from './ItemSupplierTransaction/Show'; 
import CreateItemSupplierTransaction from './ItemSupplierTransaction/Create'; 
import EditItemSupplierTransaction from './ItemSupplierTransaction/Edit'; 

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
          <Route path="/item-department" element={<ShowItemDepartment />} />
          <Route path="/item-department/create" element={<CreateItemDepartment />} />
          <Route path="/item-department/edit/:id/:categoryName" element={<EditItemDepartment />} />
          <Route path="/brand/" element={<ShowBrand />} />
          <Route path="/brand/create" element={<CreateBrand />} />
          <Route path="/brand/edit/:id" element={<EditBrand />} />
          <Route path="/item/" element={<ShowItem />} />
          <Route path="/item/create" element={<CreateItem />} />
          <Route path="/item/edit/:id" element={<EditItem />} />
          <Route path="/supplier/" element={<ShowSupplier />} />
          <Route path="/supplier/create" element={<CreateSupplier />} />
          <Route path="/supplier/edit/:id" element={<EditSupplier />} />
          <Route path="/item-supplier/" element={<ShowItemSupplier />} />
          <Route path="/item-supplier/create" element={<CreateItemSupplier />} />
          <Route path="/item-supplier/edit/:id" element={<EditItemSupplier />} />
          <Route path="/item-supplier-transaction/" element={<ShowItemSupplierTransaction />} />
          <Route path="/item-supplier-transaction/create" element={<CreateItemSupplierTransaction />} />
          <Route path="/item-supplier-transaction/edit/:id" element={<EditItemSupplierTransaction />} />
          <Route path="*" element={<RedirectToLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
