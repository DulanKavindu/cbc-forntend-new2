import { FaPlusCircle, FaTag, FaDollarSign, FaBoxes, FaAlignLeft, FaImage, FaListUl } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ProductAddPage() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [altNames, setAltNames] = useState(""); 
    const [images, setImages] = useState("");     
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigation = useNavigate()

    const handleAddProduct = () => {

        const productData = {
             productid:productId,
             productname:productName,
             altname:altNames.split(","), 
             image:images.split(","),  
             price:price,
             lasprice:lastPrice, 
             stock:stock,
             description:description
        };
        const token = localStorage.getItem("token");
        axios.post("http://localhost:5001/product", productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(()=> {
            alert("Product added successfully!");       
        navigation("/admin/addProduct")
     
    }).catch((error) => {
        console.error("There was an error adding the product!", error);
        alert("Failed to add product. Please try again.");
    });
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
                    <FaPlusCircle className="text-5xl mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold tracking-tight">Add New Product</h1>
                </div>

                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Product ID</label>
                            <div className="relative">
                                <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="P001" />
                                <FaTag className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                            <div className="relative">
                                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="iPhone 15" />
                                <FaBoxes className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Alternative Names (Separate by comma)</label>
                        <div className="relative">
                            <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="Apple Phone, iOS Device" />
                            <FaListUl className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Image URLs (Separate by comma)</label>
                        <div className="relative">
                            <input type="text" value={images} onChange={(e) => setImages(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="http://image1.jpg, http://image2.jpg" />
                            <FaImage className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="1000" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Last Price</label>
                            <input type="text" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="950" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Stock</label>
                            <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" placeholder="50" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <div className="relative">
                            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none resize-none" placeholder="Enter details..."></textarea>
                            <FaAlignLeft className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <button onClick={handleAddProduct} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition-all transform active:scale-95">
                        Add Product to Database
                    </button>
                </div>
            </div>
        </div>
    );
}