import { FaPlusCircle, FaTag, FaBoxes, FaAlignLeft, FaImage, FaListUl, FaCloudUploadAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import uploadMedia from "../../utils/mediauplord";

export default function EditProductPage() {
    const location = useLocation();
    const navigation = useNavigate();

    const product = location.state?.product;

    
    const [productId, setProductId] = useState(product?.productid || "");
    const [productName, setProductName] = useState(product?.productname || "");
    const [altNames, setAltNames] = useState(product?.altname?.join(",") || ""); 
    const [imagefile, setImagefile] = useState([]); 
    const [uploadedUrls, setUploadedUrls] = useState(product?.image || []); 
    const [price, setPrice] = useState(product?.price || "");
    const [lastPrice, setLastPrice] = useState(product?.lasprice || "");
    const [stock, setStock] = useState(product?.stock || "");
    const [description, setDescription] = useState(product?.description || "");
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        if (!product) {
            navigation("/admin/products");
        }
    }, [product, navigation]);

    if (!product) return null; 

    const handleUploadImages = async () => {
        if (imagefile.length === 0) {
            alert("Please select images first!");
            return;
        }

        setIsUploading(true);
        try {
            const promArray = [];
            for (let i = 0; i < imagefile.length; i++) {
                promArray.push(uploadMedia(imagefile[i]));
            }
            const urls = await Promise.all(promArray);
            setUploadedUrls(urls); 
            alert("Images uploaded successfully!");
        } catch (error) {
            alert("Image upload failed!"+error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdateProduct = () => {
        const productData = {
             productid: productId,
             productname: productName,
             altname: altNames.split(","), 
             image: uploadedUrls, 
             price: price,
             lasprice: lastPrice, 
             stock: stock,
             description: description
        };

        const token = localStorage.getItem("token");
       
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/product/${product.productid}`, productData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert("Product updated successfully!");       
            navigation("/admin/products");
        }).catch((error) => {
            console.error(error);
            alert("Failed to update product.");
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
                    <FaPlusCircle className="text-5xl mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold tracking-tight">Edit Product</h1>
                </div>

                <div className="p-8 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Product ID</label>
                            <div className="relative">
                                <input disabled type="text" value={productId}  onChange={(e) => setProductId(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border rounded-xl outline-none opacity-70" />
                                <FaTag className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                            <div className="relative">
                                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" />
                                <FaBoxes className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                   
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Alternative Names</label>
                        <div className="relative">
                            <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" />
                            <FaListUl className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                    </div>

             
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Update Images (Optional)</label>
                        <div className="flex items-center gap-2">
                            <input type="file" onChange={(e) => setImagefile(e.target.files)} multiple className="w-full text-sm" />
                            <button type="button" onClick={handleUploadImages} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                                <FaCloudUploadAlt /> {isUploading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 italic">*Leaving this empty will keep the old images.</p>
                    </div>

            
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Last Price</label>
                            <input type="text" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Stock</label>
                            <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none" />
                        </div>
                    </div>

                   
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <div className="relative">
                            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:border-blue-500 outline-none resize-none"></textarea>
                            <FaAlignLeft className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                    </div>

                  
                    <button 
                        onClick={handleUpdateProduct} 
                        className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition-all transform active:scale-95"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}