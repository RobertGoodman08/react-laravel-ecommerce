import React from 'react';
import './App.css';
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RedirectToDashboard from "./secure/RedirectToDashboard";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import Roles from "./pages/roles/Roles";
import RoleCreate from "./pages/roles/RoleCreate";
import RoleEdit from "./pages/roles/RoleEdit";
import Products from "./pages/products/Products";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";
import Orders from "./pages/orders/Orders";
import OrderItems from "./pages/orders/OrderItems";
import Profile from "./pages/profile/Profile";

function App() {
    const RedirectToDashboardComponent = () => <RedirectToDashboard />;
    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path={'/'} index element={<RedirectToDashboardComponent />} />
                    <Route path="/dashboard" index element={<Dashboard />} />
                    <Route path="/users" element={<Users />} index />
                    <Route path="/profile" element={<Profile />} index />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/create" element={<UserCreate />} />
                    <Route path="/user/:id/edit" element={<UserEdit />} />
                    <Route path="/roles" element={<Roles />} index />
                    <Route path="/role/create" element={<RoleCreate />}  />
                    <Route path="/role/:id/edit" element={<RoleEdit />} />
                    <Route path="/products" element={<Products />} index />
                    <Route path="/product/create" element={<ProductCreate />}  />
                    <Route path="/product/:id/edit" element={<ProductEdit />} />
                    <Route path="/orders" element={<Orders />} index />
                    <Route path="/order/:id/view" element={<OrderItems />}  />



                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;