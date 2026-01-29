import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productnotfund";


export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [state, setState] = useState("loading");

    useEffect(() => {
       
    
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`)
            .then((res) => {
                if (res.data == null) {
                    setState("not found");
                    return;
                }
  
                
                if (res.data!= null) {
                    setProduct(res.data); 
                    setState("loaded");
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
                setState("not found");
            });
    }, [productId]); 

    return (
        <div className="min-h-screen bg-primary">
          
            {state === "loading" && (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 animate-spin border-t-secondary"></div>
                </div>
            )}

          
            {state === "not found" && (
                <ProductNotFound />

            )}
        

            {state === "loaded" && (
                <div className="p-10 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-[40px] shadow-lg">
                       
                        <div className="rounded-3xl overflow-hidden bg-gray-100 h-[400px]">
                            
                        </div>

                    
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-secondary">{product?.productname}</h1>
                            <p className="text-accent font-bold text-2xl">{product?.productid}</p>
                            <p className="text-gray-600 leading-relaxed">{product?.description}</p>
                            
                            <div className="pt-6">
                                <button className="bg-secondary text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
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