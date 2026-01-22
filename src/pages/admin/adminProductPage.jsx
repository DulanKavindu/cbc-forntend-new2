import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if(!loading){
        axios.get("http://localhost:5001/product").then((response) => {

            setProduct(response.data.list);
            setLoading(true);
        });
    }
    }, [loading]);

    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between text-white">
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <FaBoxOpen /> Product Management
                    </h1>
                    <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                        Total Items: {product.length}
                    </span>
                </div>

                <div className="p-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-100 text-gray-600 uppercase text-sm">
                                <th className="py-4 px-4">ID</th>
                                <th className="py-4 px-4">Product Name</th>
                                <th className="py-4 px-4">Price</th>
                                <th className="py-4 px-4 text-center">Stock</th>

                                <th className="py-4 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {product.map((product1, index) => (
                                <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                                    <td className="py-4 px-4 font-mono text-sm text-gray-500">
                                        #{product1.productid}
                                    </td>
                                    <td className="py-4 px-4 font-semibold text-gray-800">
                                        {product1.productname}
                                        <p className="text-xs font-normal text-gray-400 truncate w-40">
                                            {product1.description}
                                        </p>
                                    </td>
                                    <td className="py-4 px-4 text-blue-600 font-bold">
                                        Rs. {product1.price}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${product1.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product1.stock} in stock
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all" title="Edit"
                                                
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all" title="Delete" onClick={()=>{
                                                const token = localStorage.getItem("token")
                                                axios.delete(`http://localhost:5001/product/${product1.productid}`, {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                }).then(()=>{
                                                    toast.success("Product deleted successfully");
                                                    setLoading(false);
                                                })
                                            }}>
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Link to="/admin/addProduct" className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all">
                <FaBoxOpen size={24} />
            </Link>
            
        </div>
    );
}