import React from 'react';
import { FaPhoneAlt, FaInfoCircle, FaShoppingBag, FaHome } from 'react-icons/fa';
import Hadder from '../componets/hader';
import { Route,Routes } from 'react-router-dom';
import ProductOverview from './productovervive';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      <div>
        <Hadder />
      </div>
      <div>
        <Routes path="*">
           <Route path="/" element={<HomePage></HomePage>}></Route>
           <Route path="/contact" element={<div>Contact Page <FaPhoneAlt /></div>}></Route>
           <Route path="/about" element={<div>About Page <FaInfoCircle /></div>}></Route>
           <Route path="/products" element={<div>Products Page <FaShoppingBag /></div>}></Route>
          <Route path="/productImfro/:id" element={<ProductOverview/>}></Route>

        </Routes>
        
      </div>
     
      
    </div>
  );
}