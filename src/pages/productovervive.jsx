import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productnotfund";

import toast from "react-hot-toast";
import { addToCart } from "../utils/cartfuntion.js";

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [state, setState] = useState("loading");
   
    const [selectedImg, setSelectedImg] = useState(0);

    useEffect(() => {
        
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`)
            .then((res) => {
                if (res.data == null) {
                    setState("not found");
                } else {
                    setProduct(res.data);
                    setState("loaded");
                }
            })
            .catch((err) => {
                console.error(err);
                setState("not found");
            });
    }, [productId]);
    function onAddtocart() {
        addToCart(product.productid)
        toast.success("Product added to cart!");

       
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {state === "loading" && (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 animate-spin border-t-secondary"></div>
                </div>
            )}

            {state === "not found" && <ProductNotFound />}

            {state === "loaded" && (
                <div className="p-6 md:p-10 max-w-6xl w-full mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
                        
                       
                        <div className="flex flex-col gap-4">
                         
                            <div className="rounded-3xl overflow-hidden bg-gray-100 h-[400px] border border-gray-100 shadow-inner">
                                <img 
                                    src={product?.image[selectedImg]} 
                                    alt={product?.productname} 
                                    className="w-full h-full object-contain transition-all duration-500" 
                                />
                            </div>

                            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
                                {product?.image.map((img, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => setSelectedImg(index)}
                                        className={`min-w-[80px] h-[80px] rounded-xl cursor-pointer border-2 transition-all ${selectedImg === index ? 'border-secondary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover rounded-lg" alt="thumbnail" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 📝 Details Section */}
                        <div className="flex flex-col justify-center space-y-5">
                            <div>
                                <h1 className="text-4xl font-black text-gray-800 leading-tight">{product?.productname}</h1>
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs font-bold uppercase mt-2 inline-block">ID: {product?.productid}</span>
                            </div>

                            <p className="text-gray-500 text-lg leading-relaxed italic">
                                "{product?.description}"
                            </p>

                            <div className="flex items-center gap-4">
                                <p className="text-4xl font-black text-secondary">${product?.price}</p>
                                <span className="text-sm text-gray-400 font-bold line-through">$ {product?.price + 50}</span>
                            </div>

                            <div className="pt-6 border-t border-gray-50">
                                <button onClick={onAddtocart} className="w-full md:w-auto bg-secondary text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}