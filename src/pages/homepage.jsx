import React from 'react';
import { FaPhoneAlt, FaInfoCircle, FaShoppingBag, FaHome, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Hadder from '../componets/hader';
import { Route, Routes } from 'react-router-dom';
import ProductOverview from './productovervive';
import ProductPage from './productpage';
import Cart from '../componets/cart';
import ContactDetails from './contactDetalis';
import OrderPage from './oderPage';
import AboutUs from './aboutUs';
import ContactUs from './contactUs';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="z-50 shadow-sm sticky top-0">
        <Hadder />
      </header>

      <main className="flex-grow">
        <Routes>
         
          <Route path="/productImfro/:id" element={<ProductOverview />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactDetails" element={<ContactDetails />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
        </Routes>
      </main>

      <footer className="bg-[#0F172A] text-white pt-20 pb-10 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black mb-6 tracking-tighter">PREMIUM<span className="text-secondary">STORE.</span></h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              Elevating your lifestyle with premium products and a seamless shopping experience. Quality you can trust.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"><FaFacebook /></div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"><FaInstagram /></div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"><FaTwitter /></div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-black text-xs uppercase tracking-[3px] text-secondary mb-2">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-bold">
              <li className="hover:text-white transition-colors cursor-pointer">Home</li>
              <li className="hover:text-white transition-colors cursor-pointer">Product Gallery</li>
              <li className="hover:text-white transition-colors cursor-pointer">Special Offers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cart</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-black text-xs uppercase tracking-[3px] text-secondary mb-2">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-bold">
              <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-white transition-colors cursor-pointer">Order Tracking</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[3px] text-secondary mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm text-slate-400 font-bold">
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-secondary mt-1" />
                <p>+94 11 234 5678</p>
              </div>
              <div className="flex items-start gap-4">
                <FaInfoCircle className="text-secondary mt-1" />
                <p>support@premiumstore.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[2px]">
            © 2026 Premium Store. Built for Excellence.
          </p>
          <div className="flex gap-6">
            <img src="visa.png" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Visa" onError={(e) => e.target.style.display='none'}/>
            <img src="mastercard.png" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Mastercard" onError={(e) => e.target.style.display='none'}/>
          </div>
        </div>
      </footer>
    </div>
  );
}