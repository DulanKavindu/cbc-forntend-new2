import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaArrowLeft } from 'react-icons/fa';

export default function ProductNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
        
       
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-accent opacity-20 blur-3xl rounded-full"></div>
          <div className="relative bg-white p-6 rounded-full shadow-inner border border-gray-50">
            <FaBoxOpen className="text-7xl text-accent animate-bounce" />
          </div>
        </div>

    
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-secondary">Oops! No Data</h1>
          <p className="text-gray-500 font-medium">
            We couldn't find the product details you're looking for. It might have been moved or deleted.
          </p>
        </div>

 
        <button
          onClick={() => navigate('/admin/products')}
          className="w-full flex items-center justify-center gap-3 bg-secondary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        <p className="text-xs text-gray-400">
          Error Code: 404_ST_NULL
        </p>
      </div>
    </div>
  );
}