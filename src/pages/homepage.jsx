import React from 'react';
import { FaPhoneAlt, FaInfoCircle, FaShoppingBag, FaHome } from 'react-icons/fa';
import Hadder from '../componets/hader';
import { Route,Routes } from 'react-router-dom';
import ProductOverview from './productovervive';
import ProductPage from './productpage';
import Cart from '../componets/cart';
import ContactDetails from './contactDetalis';
import OrderPage from './oderPage';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      <div>
        <Hadder />
      </div>
      <div>
        <Routes path="/*">
          
           <Route path="/contact" element={<div>Contact Page <FaPhoneAlt /></div>}></Route>
           <Route path="/about" element={<div>About Page <FaInfoCircle /></div>}></Route>
           <Route path="/products" element={<div>Products Page <FaShoppingBag /></div>}></Route>
          <Route path="/productImfro/:id" element={<ProductOverview/>}></Route>
          <Route path="/product" element={<ProductPage></ProductPage>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path ="/contactDetails" element={<ContactDetails></ContactDetails>}></Route>
          <Route path="/orders" element={<OrderPage/>}></Route>

        </Routes>
        
      </div>
     
      
    </div>
  );
}